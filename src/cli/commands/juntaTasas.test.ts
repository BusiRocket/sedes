import { describe, expect, it, vi } from 'vitest'

import { listJuntaFees } from '../../gobex/listJuntaFees'
import { juntaTasas } from './juntaTasas'

vi.mock('../../gobex/listJuntaFees', () => ({ listJuntaFees: vi.fn() }))

describe('juntaTasas', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaTasas.portal).toBe('junta')
    expect(juntaTasas.action).toBe('tasas')
    vi.mocked(listJuntaFees).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaTasas.run(client, {})
    expect(listJuntaFees).toHaveBeenCalled()
  })
})
