import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssDeuda } from './tgssDeuda'

describe('tgssDeuda', () => {
  it('describes itself as a tgss command', () => {
    expect(tgssDeuda.portal).toBe('tgss')
    expect(tgssDeuda.action).toBe('deuda')
    expect(tgssDeuda.options).toEqual(['nif'])
  })

  it('rejects a missing --nif before touching the client', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }
    await expect(tgssDeuda.run(client, {})).rejects.toThrow('--nif is required')
  })
})
