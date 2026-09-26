import { describe, expect, it, vi } from 'vitest'

import { listJuntaDebts } from '../../gobex/listJuntaDebts'
import { juntaDeudas } from './juntaDeudas'

vi.mock('../../gobex/listJuntaDebts', () => ({ listJuntaDebts: vi.fn() }))

describe('juntaDeudas', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaDeudas.portal).toBe('junta')
    expect(juntaDeudas.action).toBe('deudas')
    vi.mocked(listJuntaDebts).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaDeudas.run(client, {})
    expect(listJuntaDebts).toHaveBeenCalled()
  })
})
