import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaPayments } from './listJuntaPayments'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaPayments', () => {
  it('asks every sociedad, tags each payment and keeps the incidents', async () => {
    const incidents = [{ name: 'Embargo por fichero', pendingAmount: '382,18' }]
    vi.mocked(searchGobexReport)
      .mockResolvedValueOnce({
        rows: [{ netAmount: '800,00' }],
        otherGrids: { tablaIncidencias: incidents },
      })
      .mockResolvedValue({ rows: [], otherGrids: {} })
    const client = { request: vi.fn(), cookie: () => undefined }
    const result = await listJuntaPayments(client, '2020')
    expect(result).toEqual({
      ejercicio: '2020',
      payments: [{ company: 'AG00', netAmount: '800,00' }],
      incidents,
    })
    expect(searchGobexReport).toHaveBeenCalledTimes(5)
    const filters = vi.mocked(searchGobexReport).mock.calls[0]?.[2]
    expect(filters?.('f')).toMatchObject({
      'f:ejercicio': '2020',
      'f:sociedad': 'AG00',
    })
  })
})
