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

const proxy = 'https://pasarela.clave.gob.es/Proxy2/'

describe('loginWithCertificate', () => {
  it('posts the SAML entry, answers the chooser with AFIRMA and walks the relay', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(
          'https://aps.bde.es/iaec/2login',
          `<form action="${proxy}ServiceProvider"><input name="SAMLRequest" value="r"></form>`,
        ),
      )
      .mockResolvedValueOnce(
        page(
          `${proxy}ServiceProvider`,
          `<form name="idpRedirect" action="${proxy}ServiceRedirect"><input name="SelectedIdP" value=""></form>`,
        ),
      )
      .mockResolvedValueOnce(page(`${proxy}ServiceRedirect`, '<p>app</p>'))
    const client: HttpClient = { request, cookie: () => undefined }

    const landed = await loginWithCertificate(client)

    expect(landed.text).toBe('<p>app</p>')
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      form: { SAMLRequest: 'r' },
      referer: 'https://aps.bde.es/cir_www/',
      headers: { Origin: 'https://aps.bde.es' },
    })
    expect(request.mock.calls[2]?.[1]).toMatchObject({
      form: { SelectedIdP: 'AFIRMA' },
      headers: { Origin: 'https://pasarela.clave.gob.es' },
    })
  })

  it('throws without a SAML entry form', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('https://aps.bde.es/iaec/2login', '<p/>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client)).rejects.toThrow(
      /CIRBE: no SAML entry form/,
    )
  })

  it('throws without an IdP chooser', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(
          'https://aps.bde.es/iaec/2login',
          `<form action="${proxy}ServiceProvider"><input name="SAMLRequest" value="r"></form>`,
        ),
      )
      .mockResolvedValueOnce(page(`${proxy}ServiceProvider`, '<p/>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client)).rejects.toThrow(
      /CIRBE: no IdP chooser/,
    )
  })
})
