import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchEnforcedReceipts } from './fetchEnforcedReceipts'

const answer = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
  headers: {},
  body: Buffer.from(text),
  text,
})

const recibosUrl =
  'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS'

const tab =
  '<zones><script><![CDATA[var dataset_DEUDAPENDIENTE = [{"dboid":"11","referen":"6343HNW","importePrincipal":140,"importePendiente":"140.0","paseje":"23/06/2026"},{"referen":"NOKEY","importePrincipal":5,"importePendiente":"5.0","paseje":"23/06/2026"}];]]></script></zones>'

describe('fetchEnforcedReceipts', () => {
  it('lists the tab with one request when amounts are not asked for', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(tab))
    const client: HttpClient = { request, cookie: () => undefined }
    const receipts = await fetchEnforcedReceipts(client, recibosUrl, false)
    expect(request).toHaveBeenCalledTimes(1)
    expect(receipts).toHaveLength(2)
    expect(receipts[0]?.amountToday).toBe(undefined)
  })

  it('posts CALCULAR_IMP per keyed row and attaches the breakdown', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(answer(tab))
      .mockResolvedValueOnce(
        answer(
          '{"data":{"importePrincipal":140,"importeRecargo":28,"importeIntereses":1.48,"importeCostas":0,"importeActual":169.48},"result":true}',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const receipts = await fetchEnforcedReceipts(client, recibosUrl, true)
    expect(request).toHaveBeenCalledTimes(2)
    expect(request.mock.calls[1]?.[1]?.form?.['eventArguments']).toBe('KEY=11')
    expect(receipts[0]?.amountToday?.total).toBe(169.48)
    expect(receipts[0]?.amountToday?.totalText).toBe('169,48')
    expect(receipts[1]?.reference).toBe('NOKEY')
    expect(receipts[1]?.amountToday).toBe(undefined)
  })
})
