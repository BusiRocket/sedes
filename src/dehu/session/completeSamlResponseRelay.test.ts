import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { completeSamlResponseRelay } from './completeSamlResponseRelay'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const identityUrl =
  'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen'
const responseRedirectUrl =
  'https://pasarela.clave.gob.es/Proxy2/ResponseRedirect'
const loginCheckUrl =
  'https://dehu.redsara.es/api/login/login-check?selectedLanguage=es'

const identityPage = page(
  identityUrl,
  `<form action="${responseRedirectUrl}"><input type="hidden" name="SAMLResponse" value="resp1"></form>`,
)

describe('completeSamlResponseRelay', () => {
  it('relays the SAMLResponse to login-check without following its redirect', async () => {
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
      .mockResolvedValueOnce(responsePage)
      .mockResolvedValueOnce(loginCheckPage)
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await completeSamlResponseRelay(client, identityPage)

    expect(result).toBe(loginCheckPage)
    expect(request).toHaveBeenNthCalledWith(1, responseRedirectUrl, {
      method: 'POST',
      form: { SAMLResponse: 'resp1' },
      referer: identityUrl,
    })
    expect(request).toHaveBeenNthCalledWith(2, loginCheckUrl, {
      method: 'POST',
      form: { SAMLResponse: 'resp2' },
      referer: responseRedirectUrl,
      followRedirects: false,
    })
  })

  it('fails when the certificate-authentication page carries no relay form', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(
      completeSamlResponseRelay(client, page(identityUrl, '<p>none</p>')),
    ).rejects.toThrow('no SAML relay form after certificate authentication')
  })

  it('fails when the response-redirect page carries no relay form', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(responseRedirectUrl, '<p>none</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(
      completeSamlResponseRelay(client, identityPage),
    ).rejects.toThrow('no SAML relay form after the response redirect')
  })
})
