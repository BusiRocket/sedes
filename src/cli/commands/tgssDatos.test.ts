import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssDatos } from './tgssDatos'

vi.mock('../../tgss/affiliation/emitIdentityData', () => ({
  emitIdentityData: vi.fn(async (_client: unknown, outDir: unknown) =>
    Promise.resolve({ outDir }),
  ),
}))

describe('tgssDatos', () => {
  it('is the tgss datos command and passes --out through', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    expect(tgssDatos.portal).toBe('tgss')
    expect(tgssDatos.action).toBe('datos')
    await expect(tgssDatos.run(client, { out: '/tmp/datos' })).resolves.toEqual(
      {
        outDir: '/tmp/datos',
      },
    )
  })
})
