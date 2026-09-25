import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { sepeCertificado } from './sepeCertificado'

vi.mock('../../sepe/certificates/emitSituationCertificate', () => ({
  emitSituationCertificate: vi.fn(async (_client: unknown, outDir: unknown) =>
    Promise.resolve({ outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('sepeCertificado', () => {
  it('is the sepe certificado command', () => {
    expect(sepeCertificado.portal).toBe('sepe')
    expect(sepeCertificado.action).toBe('certificado')
  })

  it('passes --out through', async () => {
    const result = (await sepeCertificado.run(client, { out: '/tmp/x' })) as {
      outDir: string
    }

    expect(result.outDir).toBe('/tmp/x')
  })
})
