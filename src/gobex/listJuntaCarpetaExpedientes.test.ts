import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaCarpetaExpedientes } from './listJuntaCarpetaExpedientes'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaCarpetaExpedientes', () => {
  it('sweeps 30-day windows and keeps each expediente once', async () => {
    vi.mocked(searchGobexReport)
      .mockResolvedValueOnce({
        rows: [{ expediente: 'A' }, { expediente: 'B' }],
        otherGrids: {},
      })
      .mockResolvedValueOnce({
        rows: [{ expediente: 'B', status: 'Cerrado' }],
        otherGrids: {},
      })
    const client = { request: vi.fn(), cookie: () => undefined }
    const result = await listJuntaCarpetaExpedientes(client, {
      desde: '01/01/2026',
      hasta: '14/02/2026',
    })
    expect(result).toEqual({
      desde: '01/01/2026',
      hasta: '14/02/2026',
      expedientes: [
        { expediente: 'A' },
        { expediente: 'B', status: 'Cerrado' },
      ],
    })
    const filters = vi.mocked(searchGobexReport).mock.calls[1]?.[2]
    expect(filters?.('f')).toEqual({
      'f:estadoTramite': '9',
      'f:fechaDesdeExpInputDate': '31/01/2026',
      'f:fechaHastaExpInputDate': '14/02/2026',
    })
  })

  it('refuses a malformed date before logging in', async () => {
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(
      listJuntaCarpetaExpedientes(client, {
        desde: '2026-01-01',
        hasta: '01/02/2026',
      }),
    ).rejects.toThrow('not a dd/mm/aaaa date')
  })
})
