import { describe, expect, it, vi } from 'vitest'

import { listJuntaCarpetaNotifications } from '../../gobex/listJuntaCarpetaNotifications'
import { juntaCarpetaNotificaciones } from './juntaCarpetaNotificaciones'

vi.mock('../../gobex/listJuntaCarpetaNotifications', () => ({
  listJuntaCarpetaNotifications: vi.fn(),
}))

describe('juntaCarpetaNotificaciones', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaCarpetaNotificaciones.portal).toBe('junta')
    expect(juntaCarpetaNotificaciones.action).toBe('carpeta-notificaciones')
    vi.mocked(listJuntaCarpetaNotifications).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaCarpetaNotificaciones.run(client, {})
    expect(listJuntaCarpetaNotifications).toHaveBeenCalledWith(client)
  })
})
