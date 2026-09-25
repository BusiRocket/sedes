import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { amountTodayBody } from './amountTodayBody'
import { fetchAmountToday } from './fetchAmountToday'

const answer = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
  headers: {},
  body: Buffer.from(text),
  text,
})

const recibosUrl =
  'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS'

describe('fetchAmountToday', () => {
  it('posts the CALCULAR_IMP body for the row and parses the JSON breakdown', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(
        answer(
          '{"data":{"importePrincipal":140,"importeRecargo":28,"importeIntereses":1.48,"importeCostas":0,"importeActual":169.48},"result":true}',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const amount = await fetchAmountToday(client, recibosUrl, '1000')
    expect(amount?.total).toBe(169.48)
    expect(amount?.surcharge).toBe(28)
    expect(request).toHaveBeenCalledWith(
      'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
      {
        method: 'POST',
        form: amountTodayBody('1000'),
        referer: recibosUrl,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json, text/javascript, */*; q=0.01',
        },
      },
    )
  })

  it('answers undefined when the portal has no breakdown', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer('{"result":false}'))
    const client: HttpClient = { request, cookie: () => undefined }
    expect(await fetchAmountToday(client, recibosUrl, '1000')).toBe(undefined)
  })
})
