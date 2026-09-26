import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { juntaNotificaciones } from './juntaNotificaciones'

describe('juntaNotificaciones', () => {
  it('declares its shape and reads the junta sede', async () => {
    expect(juntaNotificaciones.portal).toBe('junta')
    expect(juntaNotificaciones.action).toBe('notificaciones')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await juntaNotificaciones.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
