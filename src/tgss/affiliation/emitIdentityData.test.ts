import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import { emitIdentityData } from './emitIdentityData'

vi.mock('./emitAffiliationReport', () => ({ emitAffiliationReport: vi.fn() }))

describe('emitIdentityData', () => {
  it('asks the engine for INAF0008 under the datos file kind', async () => {
    const stub: HttpClient = { request: vi.fn(), cookie: () => 'S1' }
    vi.mocked(emitAffiliationReport).mockResolvedValue({
      messages: ['ok'],
      notes: [],
    })

    const result = await emitIdentityData(stub, '/tmp/out')

    expect(result.messages).toEqual(['ok'])
    expect(vi.mocked(emitAffiliationReport).mock.calls[0]).toEqual([
      stub,
      {
        app: 'INAF0008',
        kind: 'datos',
        notes: [expect.stringContaining('never confirms or changes')],
      },
      '/tmp/out',
    ])
  })
})
