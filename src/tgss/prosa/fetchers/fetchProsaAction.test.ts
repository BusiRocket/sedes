import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchProsaAction } from './fetchProsaAction'

const html =
  '<html><input type="hidden" id="ARQ.SPM.TICKET" value="t1"/>' +
  '<script id="xml" type="text/plain"><ProsaXMLData/></script></html>'

const stub = (): { request: HttpClient['request']; client: HttpClient } => {
  const request = vi.fn<HttpClient['request']>().mockResolvedValue({
    status: 200,
    url: 'x',
    headers: {},
    body: Buffer.from(html),
    text: html,
  })
  return { request, client: { request, cookie: () => undefined } }
}

describe('fetchProsaAction', () => {
  it('posts the fields, the common fields and the action, and returns the new payload', async () => {
    const { request, client } = stub()

    const payload = await fetchProsaAction(
      client,
      { ticket: 't0', sessionId: 'S1', xml: '' },
      'AC_GENERAR',
      { fecha: '25/09/2026' },
    )

    expect(payload).toEqual({ ticket: 't1', xml: '<ProsaXMLData/>' })
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1',
      {
        method: 'POST',
        form: expect.objectContaining({
          'ARQ.SPM.TICKET': 't0',
          'SPM.CONTEXT': 'internet',
          fecha: '25/09/2026',
          'SPM.ACC.AC_GENERAR': 'AC_GENERAR',
        }) as Record<string, string>,
      },
    )
  })

  it('needs no fields beyond the action', async () => {
    const { request, client } = stub()

    await fetchProsaAction(
      client,
      { ticket: 't0', sessionId: 'S1', xml: '' },
      'PAGINA_SIGUIENTE',
    )

    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('jsessionid=S1'),
      {
        method: 'POST',
        form: expect.objectContaining({
          'SPM.ACC.PAGINA_SIGUIENTE': 'PAGINA_SIGUIENTE',
        }) as Record<string, string>,
      },
    )
  })
})
