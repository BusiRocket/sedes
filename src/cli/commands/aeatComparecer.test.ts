import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatComparecer } from './aeatComparecer'

vi.mock('../../aeat/appearance/appearAtNotification', () => ({
  appearAtNotification: vi.fn(async (_client: unknown, request: unknown) =>
    Promise.resolve({ request }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('aeatComparecer', () => {
  it('is a write command whose description warns about deadlines', () => {
    expect(aeatComparecer.effect).toBe('write')
    expect(aeatComparecer.description).toMatch(/STARTS every legal deadline/)
  })

  it('requires --nif, a numeric --id, and --id when confirmed', async () => {
    await expect(aeatComparecer.run(client, {})).rejects.toThrow('--nif')
    await expect(
      aeatComparecer.run(client, { nif: '00000000T', id: 'abc' }),
    ).rejects.toThrow('numeric')
    await expect(
      aeatComparecer.run(client, { nif: '00000000T', confirmar: 'si' }),
    ).rejects.toThrow('--id is required')
  })

  it('plans without --confirmar and passes the request through', async () => {
    const result = (await aeatComparecer.run(client, {
      nif: '00000000T',
      id: '123456',
      out: '/tmp/o',
    })) as { request: unknown }
    expect(result.request).toEqual({
      nif: '00000000T',
      ncc: '123456',
      outDir: '/tmp/o',
      confirm: false,
    })
  })

  it('confirms only with --confirmar si', async () => {
    const result = (await aeatComparecer.run(client, {
      nif: '00000000T',
      id: '123456',
      confirmar: 'si',
    })) as { request: { confirm: boolean } }
    expect(result.request.confirm).toBe(true)
  })
})
