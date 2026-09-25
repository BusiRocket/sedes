import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { fetchTab } from './fetchTab'
import { tabSelectionBody } from './tabSelectionBody'

const answer = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('fetchTab', () => {
  it('posts the TABSEL body with the RECIBOS page as referer and rows come back parsed', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(
        answer(
          '<zones><script><![CDATA[var dataset_DEUDAPENDIENTE = [{"referen":"1"}];]]></script></zones>',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const rows = await fetchTab(
      client,
      'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS',
      'ejecutiva',
    )
    expect(rows).toEqual([{ referen: '1' }])
    expect(request).toHaveBeenCalledWith(
      'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
      {
        method: 'POST',
        form: tabSelectionBody('ejecutiva'),
        referer:
          'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      },
    )
  })
})
