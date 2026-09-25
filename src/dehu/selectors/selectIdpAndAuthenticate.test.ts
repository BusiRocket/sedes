import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/HttpClient'
import type { HttpResponse } from '../../http/HttpResponse'
import { selectIdpAndAuthenticate } from './selectIdpAndAuthenticate'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const chooserUrl = 'https://pasarela.clave.gob.es/Proxy2/ServiceProvider'
const redirectUrl = 'https://pasarela.clave.gob.es/Proxy2/ServiceRedirect'
const authenticateUrl =
  'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen'

const chooserPage = page(
  chooserUrl,
  `<form name="idpRedirect" action="${redirectUrl}"><input type="hidden" name="RelayState" value="rs1"></form>`,
)

describe('selectIdpAndAuthenticate', () => {
  it('selects AFIRMA on the chooser, then authenticates with the certificate', async () => {
    const redirectPage = page(
      redirectUrl,
      `<form action="${authenticateUrl}"><input type="hidden" name="SAMLRequest" value="req2"></form>`,
    )
    const identityPage = page(authenticateUrl, '<p>authenticated</p>')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(redirectPage)
      .mockResolvedValueOnce(identityPage)
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await selectIdpAndAuthenticate(client, chooserPage)

    expect(result).toBe(identityPage)
    expect(request).toHaveBeenNthCalledWith(1, redirectUrl, {
      method: 'POST',
      form: { RelayState: 'rs1', SelectedIdP: 'AFIRMA' },
      referer: chooserUrl,
    })
    expect(request).toHaveBeenNthCalledWith(2, authenticateUrl, {
      method: 'POST',
      form: { SAMLRequest: 'req2' },
      referer: redirectUrl,
    })
  })

  it('fails when the chooser page carries no idpRedirect form', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(
      selectIdpAndAuthenticate(client, page(chooserUrl, '<p>no form</p>')),
    ).rejects.toThrow('no identity-provider chooser form')
  })

  it('fails when the redirect page carries no SAML relay form', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(redirectUrl, '<p>no relay form</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(selectIdpAndAuthenticate(client, chooserPage)).rejects.toThrow(
      'no SAML relay form after identity-provider selection',
    )
  })
})
