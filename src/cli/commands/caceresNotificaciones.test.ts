import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { caceresNotificaciones } from './caceresNotificaciones'

describe('caceresNotificaciones', () => {
  it('declares its shape and reads the caceres sede', async () => {
    expect(caceresNotificaciones.portal).toBe('caceres')
    expect(caceresNotificaciones.action).toBe('notificaciones')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await caceresNotificaciones.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
