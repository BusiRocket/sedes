import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaRepresentedExpedientes } from './listJuntaRepresentedExpedientes'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaRepresentedExpedientes', () => {
  it('lists every state', async () => {
    vi.mocked(searchGobexReport).mockResolvedValue({
      rows: [{ expediente: 'A' }],
      otherGrids: {},
    })
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(listJuntaRepresentedExpedientes(client)).resolves.toEqual({
      expedientes: [{ expediente: 'A' }],
    })
    expect(vi.mocked(searchGobexReport).mock.calls[0]?.[2]?.('f')).toEqual({
      'f:estadoTramite': '',
    })
  })
})
