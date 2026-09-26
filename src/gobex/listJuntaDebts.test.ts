import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaDebts } from './listJuntaDebts'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaDebts', () => {
  it('lists the debts and counts the pending ones', async () => {
    vi.mocked(searchGobexReport).mockResolvedValue({
      rows: [{ status: 'Pendiente de pago' }, { status: 'Ingresada' }, {}],
      otherGrids: {},
    })
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(listJuntaDebts(client)).resolves.toEqual({
      debts: [{ status: 'Pendiente de pago' }, { status: 'Ingresada' }, {}],
      pending: 1,
    })
  })
})
