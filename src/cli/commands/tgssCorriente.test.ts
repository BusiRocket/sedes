import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssCorriente } from './tgssCorriente'

vi.mock('../../tgss/certificates/emitUpToDateCertificate', () => ({
  emitUpToDateCertificate: vi.fn(
    async (_client: unknown, nif: unknown, kind: unknown, outDir: unknown) =>
      Promise.resolve({ nif, kind, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('tgssCorriente', () => {
  it('describes itself as a tgss command', () => {
    expect(tgssCorriente.portal).toBe('tgss')
    expect(tgssCorriente.action).toBe('corriente')
    expect(tgssCorriente.options).toEqual(['nif', 'tipo'])
  })

  it('requires --nif and a valid --tipo', async () => {
    await expect(tgssCorriente.run(client, {})).rejects.toThrow(
      '--nif is required',
    )
    await expect(
      tgssCorriente.run(client, { nif: '12345678Z', tipo: 'deuda' }),
    ).rejects.toThrow(/--tipo is required and must be one of/)
  })

  it('passes the resolved kind and --out through', async () => {
    const result = await tgssCorriente.run(client, {
      nif: '12345678Z',
      tipo: '2',
      out: '/tmp/x',
    })

    expect(result).toEqual({
      nif: '12345678Z',
      kind: 'licitacion',
      outDir: '/tmp/x',
    })
  })
})
