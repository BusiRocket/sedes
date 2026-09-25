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

const samlForm = (action: string, value: string): string =>
  `<form action="${action}"><input type="hidden" name="SAMLRequest" value="${value}"></form>`

const chooserHtml = '<html><a href="/PGIS/Login?seleccion=IPCE">IPCE</a></html>'

describe('walkSamlChain', () => {
  it('posts each SAML form, answers the chooser with an empty POST and stops on OnlineAccess', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      // hop 0: redirectForm posted to PGIS/Login, which answers the chooser
      .mockResolvedValueOnce(
        page('https://idp.seg-social.es/PGIS/Login', chooserHtml),
      )
      // hop 1: empty POST to the certificate option, answered by a SAML form
      .mockResolvedValueOnce(
        page(
          'https://idp.seg-social.es/PGIS/Login?seleccion=IPCE',
          samlForm('https://ipce.seg-social.es/IPCE/Login', 'to-ipce'),
        ),
      )
      // hop 2: IPCE answers a form back to PGIS PostLogin
      .mockResolvedValueOnce(
        page(
          'https://ipce.seg-social.es/IPCE/Login',
          samlForm('https://idp.seg-social.es/PGIS/PostLogin', 'to-pgis'),
        ),
      )
      // hop 3: PGIS answers a form to the SP PostLogin
      .mockResolvedValueOnce(
        page(
          'https://idp.seg-social.es/PGIS/PostLogin',
          samlForm(
            'https://sp.seg-social.es/SPAutenticacionClave/PostLogin',
            'to-sp',
          ),
        ),
      )
      // hop 4: the SP lands on OnlineAccess
      .mockResolvedValueOnce(
        page(
          'https://sp.seg-social.es/ProsaInternet/OnlineAccess?x=1',
          '<p>prosa</p>',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const entry = page(
      'https://sp.seg-social.es/SPAutenticacionClave/Login?URI=x',
      samlForm('https://idp.seg-social.es/PGIS/Login', 'redirectForm'),
    )

    const landed = await walkSamlChain(client, entry)

    expect(landed.text).toBe('<p>prosa</p>')
    expect(request).toHaveBeenCalledTimes(5)
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://idp.seg-social.es/PGIS/Login',
    )
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: { SAMLRequest: 'redirectForm' },
    })
    expect(request.mock.calls[1]?.[0]).toBe(
      'https://idp.seg-social.es/PGIS/Login?seleccion=IPCE',
    )
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      method: 'POST',
      body: '',
    })
    expect(request.mock.calls[4]?.[1]).toMatchObject({
      form: { SAMLRequest: 'to-sp' },
    })
  })

  it('returns a form-less page that is not the chooser', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => undefined }
    const dead = page(
      'https://sp.seg-social.es/error',
      '<p>Usuario no Autorizado</p>',
    )

    expect(await walkSamlChain(client, dead)).toBe(dead)
    expect(request).not.toHaveBeenCalled()
  })

  it('gives up after the hop limit', async () => {
    const loop = page('https://idp.example/loop', samlForm('/loop', 'x'))
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(loop)
    const client: HttpClient = { request, cookie: () => undefined }

    await walkSamlChain(client, loop)

    expect(request).toHaveBeenCalledTimes(12)
  })
})
