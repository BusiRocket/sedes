import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { fetchStaPage } from './fetchStaPage'

const origin = 'https://tramites.juntaex.es'

const client = (text: string): HttpClient => ({
  request: vi.fn<HttpClient['request']>().mockResolvedValue({
    status: 200,
    url: origin,
    headers: {},
    body: Buffer.from(text),
    text,
  }),
  cookie: () => undefined,
})

describe('fetchStaPage', () => {
  it('returns the datasets of a private page', async () => {
    const datasets = await fetchStaPage(
      client('CarpetaPrivate/Logout <script>var ds_X = [{"a":1}];</script>'),
      origin,
      'EXPEDIENTES_FULL',
    )
    expect(datasets).toEqual({ X: [{ a: 1 }] })
  })

  it('refuses a page that lost the session', async () => {
    await expect(
      fetchStaPage(client('<p>Acceder</p>'), origin, 'EXPEDIENTES_FULL'),
    ).rejects.toThrow('tramites.juntaex.es: session lost on EXPEDIENTES_FULL')
  })
})
