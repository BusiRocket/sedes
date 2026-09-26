import { afterEach, describe, expect, it, vi } from 'vitest'

import { listJuntaCarpetaExpedientes } from '../../gobex/listJuntaCarpetaExpedientes'
import { juntaCarpetaExpedientes } from './juntaCarpetaExpedientes'

vi.mock('../../gobex/listJuntaCarpetaExpedientes', () => ({
  listJuntaCarpetaExpedientes: vi.fn(),
}))

afterEach(() => {
  vi.useRealTimers()
})

describe('juntaCarpetaExpedientes', () => {
  it('defaults to the last 365 days', async () => {
    vi.useFakeTimers({ now: new Date(2026, 8, 26, 12) })
    expect(juntaCarpetaExpedientes.action).toBe('carpeta-expedientes')
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaCarpetaExpedientes.run(client, {})
    expect(listJuntaCarpetaExpedientes).toHaveBeenLastCalledWith(client, {
      desde: '26/09/2025',
      hasta: '26/09/2026',
    })
  })

  it('passes an explicit range', async () => {
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaCarpetaExpedientes.run(client, {
      desde: '01/01/2020',
      hasta: '31/12/2020',
    })
    expect(listJuntaCarpetaExpedientes).toHaveBeenLastCalledWith(client, {
      desde: '01/01/2020',
      hasta: '31/12/2020',
    })
  })
})
