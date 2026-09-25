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

describe('oargtRecibos', () => {
  it('declares its shape', () => {
    expect(oargtRecibos.portal).toBe('oargt')
    expect(oargtRecibos.action).toBe('recibos')
    expect(oargtRecibos.options).toEqual(['include'])
  })

  it('only fetches the pagados tab when --include paid is given', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://sede.oargt.es/x', '<p>no rows</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await oargtRecibos.run(client, { include: undefined })
    expect(request).toHaveBeenCalledTimes(3)
  })

  it('fetches the pagados tab too when asked', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://sede.oargt.es/x', '<p>no rows</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    await oargtRecibos.run(client, { include: 'paid' })
    expect(request).toHaveBeenCalledTimes(4)
  })
})
