import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import { emitNegativeEmployerReport } from './emitNegativeEmployerReport'

vi.mock('./emitAffiliationReport', () => ({ emitAffiliationReport: vi.fn() }))

describe('emitNegativeEmployerReport', () => {
  it('requests INAF0005 as the empresario informe', async () => {
    const http: HttpClient = { request: vi.fn(), cookie: () => undefined }
    vi.mocked(emitAffiliationReport).mockResolvedValue({
      messages: [],
      notes: [],
      bytes: 10,
    })

    const { bytes } = await emitNegativeEmployerReport(http, undefined)

    expect(bytes).toBe(10)
    expect(emitAffiliationReport).toHaveBeenCalledOnce()
    expect(vi.mocked(emitAffiliationReport).mock.lastCall?.[1]).toMatchObject({
      app: 'INAF0005',
      kind: 'empresario',
    })
  })
})
