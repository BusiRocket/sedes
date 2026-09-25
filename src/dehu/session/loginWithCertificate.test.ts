import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { dehuUrls } from '../api/dehuUrls'
import { loginWithCertificate } from './loginWithCertificate'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const serviceProviderUrl =
  'https://pasarela.clave.gob.es/Proxy2/ServiceProvider'
const serviceRedirectUrl =
  'https://pasarela.clave.gob.es/Proxy2/ServiceRedirect'
const authenticateUrl =
  'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen'
const responseRedirectUrl =
  'https://pasarela.clave.gob.es/Proxy2/ResponseRedirect'
const loginCheckUrl =
  'https://dehu.redsara.es/api/login/login-check?selectedLanguage=es'

describe('loginWithCertificate', () => {
  it('walks all six hops and returns the authData bearer JWT', async () => {
    const claveFormHtml = `<form action="${serviceProviderUrl}"><input type="hidden" name="SAMLRequest" value="req1"></form>`
    const chooserPage = page(
      serviceProviderUrl,
      `<form name="idpRedirect" action="${serviceRedirectUrl}"><input type="hidden" name="RelayState" value="rs1"></form>`,
    )
    const redirectPage = page(
      serviceRedirectUrl,
      `<form action="${authenticateUrl}"><input type="hidden" name="SAMLRequest" value="req2"></form>`,
    )
    const identityPage = page(
      authenticateUrl,
      `<form action="${responseRedirectUrl}"><input type="hidden" name="SAMLResponse" value="resp1"></form>`,
    )
    const responsePage = page(
      responseRedirectUrl,
      `<form action="${loginCheckUrl}"><input type="hidden" name="SAMLResponse" value="resp2"></form>`,
    )
    const loginCheckPage: HttpResponse = {
      status: 302,
      url: loginCheckUrl,
      headers: { location: '/es/login?authData=JWT123' },
      body: Buffer.from(''),
      text: '',
    }
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(dehuUrls.loginClaveForm, JSON.stringify(claveFormHtml)),
      )
      .mockResolvedValueOnce(chooserPage)
      .mockResolvedValueOnce(redirectPage)
      .mockResolvedValueOnce(identityPage)
      .mockResolvedValueOnce(responsePage)
      .mockResolvedValueOnce(loginCheckPage)
    const client: HttpClient = { request, cookie: () => undefined }

    const authData = await loginWithCertificate(client)

    expect(authData).toBe('JWT123')
    expect(request).toHaveBeenCalledTimes(6)
    // The AFIRMA (certificate) identity provider is selected on the chooser hop.
    expect(request.mock.calls[2]?.[1]).toMatchObject({
      form: { RelayState: 'rs1', SelectedIdP: 'AFIRMA' },
    })
    // The final hop never follows DEHU's redirect; the JWT comes from its Location header.
    expect(request.mock.calls[5]?.[1]).toMatchObject({ followRedirects: false })
  })

  it('fails when login-check answers without an authData location', async () => {
    const claveFormHtml = `<form action="${serviceProviderUrl}"><input type="hidden" name="SAMLRequest" value="req1"></form>`
    const chooserPage = page(
      serviceProviderUrl,
      `<form name="idpRedirect" action="${serviceRedirectUrl}"><input type="hidden" name="RelayState" value="rs1"></form>`,
    )
    const redirectPage = page(
      serviceRedirectUrl,
      `<form action="${authenticateUrl}"><input type="hidden" name="SAMLRequest" value="req2"></form>`,
    )
    const identityPage = page(
      authenticateUrl,
      `<form action="${responseRedirectUrl}"><input type="hidden" name="SAMLResponse" value="resp1"></form>`,
    )
    const responsePage = page(
      responseRedirectUrl,
      `<form action="${loginCheckUrl}"><input type="hidden" name="SAMLResponse" value="resp2"></form>`,
    )
    const failedLoginCheckPage: HttpResponse = {
      status: 401,
      url: loginCheckUrl,
      headers: {},
      body: Buffer.from('denied'),
      text: 'denied',
    }
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(dehuUrls.loginClaveForm, JSON.stringify(claveFormHtml)),
      )
      .mockResolvedValueOnce(chooserPage)
      .mockResolvedValueOnce(redirectPage)
      .mockResolvedValueOnce(identityPage)
      .mockResolvedValueOnce(responsePage)
      .mockResolvedValueOnce(failedLoginCheckPage)
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client)).rejects.toThrow(
      'no authData in the login-check response',
    )
  })
})
