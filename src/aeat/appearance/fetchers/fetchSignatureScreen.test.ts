import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchSignatureScreen } from './fetchSignatureScreen'

const answer = (
  status: number,
): Awaited<ReturnType<HttpClient['request']>> => ({
  status,
  url: '',
  headers: {},
  body: Buffer.alloc(0),
  text: 'screen',
})

describe('fetchSignatureScreen', () => {
  it('GETs DetalleSede for the ncc', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200))
    expect(
      await fetchSignatureScreen(
        { request, cookie: () => undefined },
        '123456',
      ),
    ).toBe('screen')
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/GNNO-JDIT/DetalleSede?ncc=123456',
    )
    expect(request.mock.calls[0]?.[1]?.method).toBeUndefined()
  })

  it('throws on anything but 200', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(404))
    await expect(
      fetchSignatureScreen({ request, cookie: () => undefined }, '1'),
    ).rejects.toThrow('HTTP 404')
  })
})
