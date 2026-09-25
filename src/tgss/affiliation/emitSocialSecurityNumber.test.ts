import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import { emitSocialSecurityNumber } from './emitSocialSecurityNumber'

vi.mock('./emitAffiliationReport', () => ({ emitAffiliationReport: vi.fn() }))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('emitSocialSecurityNumber', () => {
  it('opens INAF0007 and takes the attached NSS informe without posting', async () => {
    vi.mocked(emitAffiliationReport).mockResolvedValue({
      messages: [],
      notes: [],
    })

    await emitSocialSecurityNumber(client, undefined)

    expect(emitAffiliationReport).toHaveBeenCalledWith(
      client,
      expect.objectContaining({ app: 'INAF0007', kind: 'nss' }),
      undefined,
    )
    const request = vi.mocked(emitAffiliationReport).mock.calls[0]?.[1]
    expect(request).not.toHaveProperty('action')
    expect(request?.notes.join()).toContain('attaches the NSS informe')
  })
})
