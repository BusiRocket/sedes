import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssAlta } from './tgssAlta'

vi.mock('../../tgss/affiliation/emitEmploymentAtDate', () => ({
  emitEmploymentAtDate: vi.fn(
    async (_client: unknown, fecha: unknown, outDir: unknown) =>
      Promise.resolve({ fecha, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('tgssAlta', () => {
  it('requires --fecha', async () => {
    await expect(tgssAlta.run(client, {})).rejects.toThrow(
      /--fecha is required/,
    )
  })

  it('passes the date and --out through', async () => {
    await expect(
      tgssAlta.run(client, { fecha: '25/09/2026', out: '/tmp/alta' }),
    ).resolves.toEqual({ fecha: '25/09/2026', outDir: '/tmp/alta' })
  })
})
