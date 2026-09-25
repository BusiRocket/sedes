import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssEmpresario } from './tgssEmpresario'

vi.mock('../../tgss/affiliation/emitNegativeEmployerReport', () => ({
  emitNegativeEmployerReport: vi.fn(async (_client: unknown, outDir: unknown) =>
    Promise.resolve({ outDir }),
  ),
}))

describe('tgssEmpresario', () => {
  it('is the tgss empresario command and passes --out through', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    expect(tgssEmpresario.portal).toBe('tgss')
    expect(tgssEmpresario.action).toBe('empresario')
    await expect(
      tgssEmpresario.run(client, { out: '/tmp/empresario' }),
    ).resolves.toEqual({
      outDir: '/tmp/empresario',
    })
  })
})
