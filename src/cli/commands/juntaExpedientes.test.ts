import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { juntaExpedientes } from './juntaExpedientes'

describe('juntaExpedientes', () => {
  it('declares its shape and reads the junta sede', async () => {
    expect(juntaExpedientes.portal).toBe('junta')
    expect(juntaExpedientes.action).toBe('expedientes')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await juntaExpedientes.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
