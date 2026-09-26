import { describe, expect, it, vi } from 'vitest'

import { listJuntaRepresentedExpedientes } from '../../gobex/listJuntaRepresentedExpedientes'
import { juntaRepresentados } from './juntaRepresentados'

vi.mock('../../gobex/listJuntaRepresentedExpedientes', () => ({
  listJuntaRepresentedExpedientes: vi.fn(),
}))

describe('juntaRepresentados', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaRepresentados.portal).toBe('junta')
    expect(juntaRepresentados.action).toBe('representados')
    vi.mocked(listJuntaRepresentedExpedientes).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaRepresentados.run(client, {})
    expect(listJuntaRepresentedExpedientes).toHaveBeenCalledWith(client)
  })
})
