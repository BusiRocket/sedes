import { describe, expect, it, vi } from 'vitest'

import { listJuntaDocuments } from '../../gobex/listJuntaDocuments'
import { juntaDocumentos } from './juntaDocumentos'

vi.mock('../../gobex/listJuntaDocuments', () => ({
  listJuntaDocuments: vi.fn(),
}))

describe('juntaDocumentos', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaDocumentos.portal).toBe('junta')
    expect(juntaDocumentos.action).toBe('documentos')
    vi.mocked(listJuntaDocuments).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaDocumentos.run(client, {})
    expect(listJuntaDocuments).toHaveBeenCalledWith(client)
  })
})
