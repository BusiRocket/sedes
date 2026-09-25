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

const prosaLanding = (ticket: string, xml: string): string =>
  `<html><input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/>` +
  `<script id="xml" type="text/plain">${xml}</script></html>`

describe('loginWithCertificate', () => {
  it('enters, walks the chain and returns the Prosa session', async () => {
    const xml = '<ProsaXMLData><app><![CDATA[AECP]]></app></ProsaXMLData>'
    const landedPage = page(
      'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1',
      prosaLanding('a66813372eac4554', xml),
    )
    const request = vi
      .fn<HttpClient['request']>()
      // the entry answers a page without a form and without the chooser
      // markers, so the chain ends where it starts; the relay itself is
      // covered by walkSamlChain.test.ts
      .mockResolvedValueOnce(landedPage)
    const cookie = vi.fn<HttpClient['cookie']>().mockReturnValue('SESSION123')
    const client: HttpClient = { request, cookie }

    const session = await loginWithCertificate(client)

    expect(session).toEqual({
      ticket: 'a66813372eac4554',
      sessionId: 'SESSION123',
      xml,
    })
    expect(request).toHaveBeenCalledTimes(1)
    expect(cookie).toHaveBeenCalledWith(
      'sp.seg-social.es',
      'JSESSIONID_endPoint',
    )
  })

  it('throws when the session lands without a JSESSIONID_endPoint cookie', async () => {
    const landedPage = page(
      'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1',
      prosaLanding('a1', '<ProsaXMLData/>'),
    )
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(landedPage)
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(loginWithCertificate(client)).rejects.toThrow(
      /no JSESSIONID_endPoint/,
    )
  })
})
