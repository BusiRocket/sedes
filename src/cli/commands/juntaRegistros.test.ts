import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { juntaRegistros } from './juntaRegistros'

describe('juntaRegistros', () => {
  it('declares its shape and reads the junta sede', async () => {
    expect(juntaRegistros.portal).toBe('junta')
    expect(juntaRegistros.action).toBe('registros')
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://sede.example.es/',
      headers: {},
      body: Buffer.alloc(0),
      text: 'CarpetaPrivate/Logout',
    })
    const result = await juntaRegistros.run(
      { request, cookie: () => undefined },
      {},
    )
    expect((result as { readonly host: string }).host).toMatch(/\.es$/)
  })
})
