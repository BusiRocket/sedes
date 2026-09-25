import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { loginWithCertificate } from './loginWithCertificate'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const service = 'https://sede.sepe.gob.es/Servicio.do'
const proxy = 'https://pasarela.clave.gob.es/Proxy2/'

describe('loginWithCertificate', () => {
  it('plays init, ServiceProvider with the SEPE Origin, the chooser with AFIRMA and the relay', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(
          'https://isweb.sepe.gob.es/GetAccess/Saml/SSO/Init?x',
          `<form action="${proxy}ServiceProvider"><input name="SAMLRequest" value="req"></form>`,
        ),
      )
      .mockResolvedValueOnce(
        page(
          `${proxy}ServiceProvider`,
          '<form action="/lang"><input name="lang" value="es"></form>' +
            `<form name="idpRedirect" action="${proxy}ServiceRedirect"><input name="SAMLRequest" value="req2"><input name="SelectedIdP" value=""></form>`,
        ),
      )
      .mockResolvedValueOnce(
        page(
          `${proxy}ServiceRedirect`,
          '<form action=""><input name="SAMLRequest" value="req3"><input name="idpUrl" value="https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen"></form>',
        ),
      )
      .mockResolvedValueOnce(page(service, '<p>landed</p>'))
    const client: HttpClient = { request, cookie: () => undefined }

    const landed = await loginWithCertificate(client, service)

    expect(landed.text).toBe('<p>landed</p>')
    expect(request.mock.calls[0]?.[0]).toContain(
      'GAURI=https%3A%2F%2Fsede.sepe.gob.es%2FServicio.do',
    )
    expect(request.mock.calls[1]?.[0]).toBe(`${proxy}ServiceProvider`)
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      form: { SAMLRequest: 'req' },
      headers: { Origin: 'https://isweb.sepe.gob.es' },
    })
    expect(request.mock.calls[2]?.[0]).toBe(`${proxy}ServiceRedirect`)
    expect(request.mock.calls[2]?.[1]).toMatchObject({
      form: { SAMLRequest: 'req2', SelectedIdP: 'AFIRMA' },
      headers: { Origin: 'https://pasarela.clave.gob.es' },
      referer: `${proxy}ServiceProvider`,
    })
    expect(request.mock.calls[3]?.[0]).toBe(
      'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen',
    )
  })

  it('throws when the SSO init carries no form', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('https://isweb.sepe.gob.es/err', '<p>no</p>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client, service)).rejects.toThrow(
      /no SAML entry form/,
    )
  })

  it('throws when Cl@ve answers without the IdP chooser', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(
          'https://isweb.sepe.gob.es/init',
          `<form action="${proxy}ServiceProvider"><input name="SAMLRequest" value="req"></form>`,
        ),
      )
      .mockResolvedValueOnce(
        page(`${proxy}ServiceProvider`, '<p>invalid.sp.domain</p>'),
      )
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client, service)).rejects.toThrow(
      /no IdP chooser/,
    )
  })
})
