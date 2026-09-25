import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssDeuda } from './tgssDeuda'

vi.mock('../../tgss/debt/readTgssDebt', () => ({
  readTgssDebt: vi.fn(
    async (_client: unknown, nif: unknown, outDir: unknown, kind: unknown) =>
      Promise.resolve({ nif, outDir, kind }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('tgssDeuda', () => {
  it('describes itself as a tgss command', () => {
    expect(tgssDeuda.portal).toBe('tgss')
    expect(tgssDeuda.action).toBe('deuda')
    expect(tgssDeuda.options).toEqual(['nif', 'tipo'])
  })

  it('rejects a missing --nif and an unknown --tipo before touching the client', async () => {
    await expect(tgssDeuda.run(client, {})).rejects.toThrow('--nif is required')
    await expect(
      tgssDeuda.run(client, { nif: '12345678Z', tipo: 'resumen' }),
    ).rejects.toThrow(/--tipo must be detallado or total/)
  })

  it('defaults to the detailed report and passes --tipo total through', async () => {
    await expect(tgssDeuda.run(client, { nif: '12345678Z' })).resolves.toEqual({
      nif: '12345678Z',
      outDir: undefined,
      kind: 'detallado',
    })
    await expect(
      tgssDeuda.run(client, { nif: '12345678Z', tipo: 'total', out: '/tmp/x' }),
    ).resolves.toEqual({ nif: '12345678Z', outDir: '/tmp/x', kind: 'total' })
  })
})
