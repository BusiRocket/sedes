import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { postAppearance } from './postAppearance'

const answer = (
  status: number,
): Awaited<ReturnType<HttpClient['request']>> => ({
  status,
  url: '',
  headers: {},
  body: Buffer.alloc(0),
  text: 'done',
})

describe('postAppearance', () => {
  it('POSTs accion=firma with FirmaBasica', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200))
    const text = await postAppearance(
      { request, cookie: () => undefined },
      '123456',
      { nif: '00000000T', nombre: 'ANA' },
    )
    expect(text).toBe('done')
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: {
        accion: 'firma',
        FIRNIF: '00000000T',
        FIRNOMBRE: 'ANA',
        FIR: 'FirmaBasica',
      },
    })
  })

  it('throws on anything but 200', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(302))
    await expect(
      postAppearance({ request, cookie: () => undefined }, '1', {
        nif: 'x',
        nombre: 'y',
      }),
    ).rejects.toThrow('HTTP 302')
  })
})
