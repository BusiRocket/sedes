import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaFees } from './listJuntaFees'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaFees', () => {
  it('reads the paid fees and the incidents', async () => {
    vi.mocked(searchGobexReport)
      .mockResolvedValueOnce({ rows: [{ amount: '33,10' }], otherGrids: {} })
      .mockResolvedValueOnce({ rows: [], otherGrids: {} })
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(listJuntaFees(client)).resolves.toEqual({
      paid: [{ amount: '33,10' }],
      incidents: [],
    })
  })
})
