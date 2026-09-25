import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssVidaLaboral } from './tgssVidaLaboral'

vi.mock('../../tgss/affiliation/emitVidaLaboral', () => ({
  emitVidaLaboral: vi.fn(
    async (_client: unknown, query: unknown, outDir: unknown) =>
      Promise.resolve({ query, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('tgssVidaLaboral', () => {
  it('requires --desde', async () => {
    await expect(tgssVidaLaboral.run(client, {})).rejects.toThrow(
      /--desde is required/,
    )
  })

  it('defaults --hasta to today and passes --out through', async () => {
    const result = (await tgssVidaLaboral.run(client, {
      desde: '01/01/2018',
      out: '/tmp/x',
    })) as { query: { desde: string; hasta: string }; outDir: string }

    expect(result.query.desde).toBe('01/01/2018')
    expect(result.query.hasta).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    expect(result.outDir).toBe('/tmp/x')
  })
})
