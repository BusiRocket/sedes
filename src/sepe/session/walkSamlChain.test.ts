import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { walkSamlChain } from './walkSamlChain'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const proxy = 'https://pasarela.clave.gob.es/Proxy2/'
const idp = 'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen'

describe('walkSamlChain', () => {
  it('posts to idpUrl when present, to the action otherwise, and stops on the service page', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(
          idp,
          `<form action="${proxy}ResponseRedirect"><input name="SAMLResponse" value="resp"></form>`,
        ),
      )
      .mockResolvedValueOnce(
        page(
          `${proxy}ResponseRedirect`,
          '<form action="https://isweb.sepe.gob.es/GetAccess/Saml/SP/SSO/Post"><input name="SAMLResponse" value="final"></form>',
        ),
      )
      .mockResolvedValueOnce(
        page('https://sede.sepe.gob.es/Servicio.do', '<p>servicio</p>'),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const entry = page(
      `${proxy}ServiceRedirect`,
      `<form action=""><input name="SAMLRequest" value="req"><input name="idpUrl" value="${idp}"></form>`,
    )

    const landed = await walkSamlChain(client, entry)

    expect(landed.text).toBe('<p>servicio</p>')
    expect(request).toHaveBeenCalledTimes(3)
    expect(request.mock.calls[0]?.[0]).toBe(idp)
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: { SAMLRequest: 'req' },
      referer: `${proxy}ServiceRedirect`,
    })
    expect(request.mock.calls[1]?.[0]).toBe(`${proxy}ResponseRedirect`)
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      form: { SAMLResponse: 'resp' },
      referer: idp,
    })
    expect(request.mock.calls[2]?.[0]).toBe(
      'https://isweb.sepe.gob.es/GetAccess/Saml/SP/SSO/Post',
    )
  })

  it('returns the entry untouched when it already is the service', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => undefined }
    const service = page('https://sede.sepe.gob.es/x.do', '<p>x</p>')

    expect(await walkSamlChain(client, service)).toBe(service)
    expect(request).not.toHaveBeenCalled()
  })

  it('throws after five hops that keep relaying', async () => {
    const loop = page(
      'https://idp.example/loop',
      '<form action="/loop"><input name="ClaveToken" value="t"></form>',
    )
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(loop)
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(walkSamlChain(client, loop)).rejects.toThrow(
      /did not settle after 5 hops/,
    )
    expect(request).toHaveBeenCalledTimes(5)
  })
})
