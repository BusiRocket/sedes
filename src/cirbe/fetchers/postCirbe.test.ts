import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { postCirbe } from './postCirbe'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('postCirbe', () => {
  it('posts with the app Referer and the Banco de España Origin', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/x', 'ok'))
    const client: HttpClient = { request, cookie: () => undefined }

    await postCirbe(client, 'https://aps.bde.es/x', { a: '1' })
    await postCirbe(client, 'https://aps.bde.es/y')

    expect(request).toHaveBeenNthCalledWith(1, 'https://aps.bde.es/x', {
      method: 'POST',
      form: { a: '1' },
      referer: 'https://aps.bde.es/cir_www/',
      headers: { Origin: 'https://aps.bde.es' },
    })
    expect(request.mock.calls[1]?.[1]?.form).toEqual({})
  })
})
