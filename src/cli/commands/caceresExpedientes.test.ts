import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { caceresExpedientes } from './caceresExpedientes'

describe('caceresExpedientes', () => {
  it('declares its shape and reads the caceres sede', async () => {
    expect(caceresExpedientes.portal).toBe('caceres')
    expect(caceresExpedientes.action).toBe('expedientes')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await caceresExpedientes.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
