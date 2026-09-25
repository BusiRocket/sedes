import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatCertificadoCensal } from './aeatCertificadoCensal'

vi.mock('../../aeat/census/emitCensalCertificate', () => ({
  emitCensalCertificate: vi.fn(
    async (_client: unknown, request: unknown, outDir: unknown) =>
      Promise.resolve({ request, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('aeatCertificadoCensal', () => {
  it('requires --nif', async () => {
    await expect(
      aeatCertificadoCensal.run(client, { nombre: 'ACME SL' }),
    ).rejects.toThrow(/--nif is required/)
  })

  it('requires --nombre', async () => {
    await expect(
      aeatCertificadoCensal.run(client, { nif: 'B00000000' }),
    ).rejects.toThrow(/--nombre is required/)
  })

  it('passes the request and --out through', async () => {
    const result = (await aeatCertificadoCensal.run(client, {
      nif: 'B00000000',
      nombre: 'ACME SL',
      out: '/tmp/x',
    })) as { request: { nif: string; nombre: string }; outDir: string }

    expect(result.request).toEqual({ nif: 'B00000000', nombre: 'ACME SL' })
    expect(result.outDir).toBe('/tmp/x')
  })
})
