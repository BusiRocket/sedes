import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { oargtRecibos } from './oargtRecibos'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const url = 'https://sede.oargt.es/x'

describe('oargtRecibos', () => {
  it('declares its shape', () => {
    expect(oargtRecibos.portal).toBe('oargt')
    expect(oargtRecibos.action).toBe('recibos')
    expect(oargtRecibos.options).toEqual(['include', 'importes'])
  })

  it('only fetches the pagados tab when --include paid is given', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page(url, '<p>no rows</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await oargtRecibos.run(client, { include: undefined })
    expect(request).toHaveBeenCalledTimes(3)
  })

  it('fetches the pagados tab too when asked', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page(url, '<p>no rows</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await oargtRecibos.run(client, { include: 'paid' })
    expect(request).toHaveBeenCalledTimes(4)
  })

  it('posts CALCULAR_IMP per enforced receipt when --importes is given', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(url, '<p>ok</p>'))
      .mockResolvedValueOnce(page(url, '<p>no rows</p>'))
      .mockResolvedValueOnce(
        page(
          url,
          '<zones><script><![CDATA[var dataset_DEUDAPENDIENTE = [{"dboid":"7","referen":"A","importePrincipal":1,"importePendiente":"1.0","paseje":"01/01/2026"}];]]></script></zones>',
        ),
      )
      .mockResolvedValueOnce(
        page(
          url,
          '{"data":{"importePrincipal":1,"importeRecargo":0.2,"importeIntereses":0,"importeCostas":0,"importeActual":1.2},"result":true}',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const result = (await oargtRecibos.run(client, { importes: 'yes' })) as {
      amountTodayAvailable: boolean
    }
    expect(request).toHaveBeenCalledTimes(4)
    expect(request.mock.calls[3]?.[1]?.form?.['eventAction']).toBe(
      'CALCULAR_IMP',
    )
    expect(result.amountTodayAvailable).toBe(true)
  })
})
