import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatInformativas } from './aeatInformativas'

vi.mock('../../aeat/informatives/listAeatInformatives', () => ({
  listAeatInformatives: vi.fn(
    async (_client: unknown, nif: unknown, query: unknown, outDir: unknown) =>
      Promise.resolve({ nif, query, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('aeatInformativas', () => {
  it('requires --nif', async () => {
    await expect(
      aeatInformativas.run(client, { modelo: '190', ejercicio: '2025' }),
    ).rejects.toThrow(/--nif is required/)
  })

  it('requires --modelo and --ejercicio', async () => {
    await expect(
      aeatInformativas.run(client, { nif: 'B00000000', modelo: '190' }),
    ).rejects.toThrow(/--modelo and --ejercicio/)
  })

  it('passes nif, query and --out through', async () => {
    const result = (await aeatInformativas.run(client, {
      nif: 'B00000000',
      modelo: '190',
      ejercicio: '2025',
      out: '/tmp/x',
    })) as { nif: string; query: unknown; outDir: string }

    expect(result.nif).toBe('B00000000')
    expect(result.query).toEqual({ modelo: '190', ejercicio: '2025' })
    expect(result.outDir).toBe('/tmp/x')
  })
})
