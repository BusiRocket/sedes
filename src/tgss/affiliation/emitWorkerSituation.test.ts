import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import { emitWorkerSituation } from './emitWorkerSituation'

vi.mock('./emitAffiliationReport', () => ({ emitAffiliationReport: vi.fn() }))

describe('emitWorkerSituation', () => {
  it('emits INAF0013 as an entry-screen informe named situacion', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }
    const outcome = { messages: [], notes: ['n'] }
    vi.mocked(emitAffiliationReport).mockResolvedValue(outcome)

    await expect(emitWorkerSituation(client, '/out')).resolves.toBe(outcome)

    const call = vi.mocked(emitAffiliationReport).mock.calls[0]
    expect(call?.[1].app).toBe('INAF0013')
    expect(call?.[1].kind).toBe('situacion')
    expect(call?.[1].action).toBeUndefined()
    expect(call?.[1].notes[0]).toMatch(
      /generates the informe when the service opens/,
    )
    expect(call?.[2]).toBe('/out')
  })
})
