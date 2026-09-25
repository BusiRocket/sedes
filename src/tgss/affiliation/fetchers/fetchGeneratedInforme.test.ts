import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchGeneratedInforme } from './fetchGeneratedInforme'

describe('fetchGeneratedInforme', () => {
  it('posts the dates with the common fields and returns the new payload', async () => {
    const html =
      '<html><input type="hidden" id="ARQ.SPM.TICKET" value="t1"/>' +
      '<script id="xml" type="text/plain"><ProsaXMLData/></script></html>'
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'x',
      headers: {},
      body: Buffer.from(html),
      text: html,
    })
    const client: HttpClient = { request, cookie: () => undefined }

    const payload = await fetchGeneratedInforme(
      client,
      { ticket: 't0', sessionId: 'S1', xml: '' },
      { desde: '01/01/2018', hasta: '25/09/2026' },
    )

    expect(payload).toEqual({ ticket: 't1', xml: '<ProsaXMLData/>' })
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1',
      {
        method: 'POST',
        form: expect.objectContaining({
          'ARQ.SPM.TICKET': 't0',
          fechaDesde: '01/01/2018',
          fechaHasta: '25/09/2026',
          'SPM.ACC.AC_GENERAR_FECHAS': 'AC_GENERAR_FECHAS',
        }) as Record<string, string>,
      },
    )
  })
})
