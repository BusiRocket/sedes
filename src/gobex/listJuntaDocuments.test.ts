import { describe, expect, it, vi } from 'vitest'

import { searchGobexReport } from './fetchers/searchGobexReport'
import { listJuntaDocuments } from './listJuntaDocuments'

vi.mock('./session/loginWithClave', () => ({ loginWithClave: vi.fn() }))
vi.mock('./fetchers/searchGobexReport', () => ({ searchGobexReport: vi.fn() }))

describe('listJuntaDocuments', () => {
  it('lists the filed documents', async () => {
    vi.mocked(searchGobexReport).mockResolvedValue({
      rows: [{ name: 'Solicitud.pdf' }],
      otherGrids: {},
    })
    const client = { request: vi.fn(), cookie: () => undefined }
    await expect(listJuntaDocuments(client)).resolves.toEqual({
      documents: [{ name: 'Solicitud.pdf' }],
    })
  })
})
