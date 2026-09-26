import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { caceresRegistros } from './caceresRegistros'

describe('caceresRegistros', () => {
  it('declares its shape and reads the caceres sede', async () => {
    expect(caceresRegistros.portal).toBe('caceres')
    expect(caceresRegistros.action).toBe('registros')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await caceresRegistros.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
