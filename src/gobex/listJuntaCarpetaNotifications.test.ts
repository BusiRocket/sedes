import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaCarpetaNotifications } from './listJuntaCarpetaNotifications'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaCarpetaNotifications', () => {
  it('lists every state and counts the pending ones', async () => {
    vi.mocked(searchGobexReport).mockResolvedValue({
      rows: [{ status: 'Pendiente' }, { status: 'Expirado' }, {}],
      otherGrids: {},
    })
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(listJuntaCarpetaNotifications(client)).resolves.toEqual({
      notifications: [{ status: 'Pendiente' }, { status: 'Expirado' }, {}],
      pending: 1,
    })
    expect(vi.mocked(searchGobexReport).mock.calls[0]?.[2]?.('f')).toEqual({
      'f:estado': '',
    })
  })
})
