import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssNss } from './tgssNss'

vi.mock('../../tgss/affiliation/emitSocialSecurityNumber', () => ({
  emitSocialSecurityNumber: vi.fn(async (_client: unknown, outDir: unknown) =>
    Promise.resolve({ outDir }),
  ),
}))

describe('tgssNss', () => {
  it('is the tgss nss command and passes --out through', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    expect(tgssNss.portal).toBe('tgss')
    expect(tgssNss.action).toBe('nss')
    await expect(tgssNss.run(client, { out: '/tmp/nss' })).resolves.toEqual({
      outDir: '/tmp/nss',
    })
  })
})
