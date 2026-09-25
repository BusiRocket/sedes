import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssSituacion } from './tgssSituacion'

vi.mock('../../tgss/affiliation/emitWorkerSituation', () => ({
  emitWorkerSituation: vi.fn(async (_client: unknown, outDir: unknown) =>
    Promise.resolve({ outDir }),
  ),
}))

describe('tgssSituacion', () => {
  it('is the tgss situacion command and passes --out through', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    expect(tgssSituacion.portal).toBe('tgss')
    expect(tgssSituacion.action).toBe('situacion')
    await expect(
      tgssSituacion.run(client, { out: '/tmp/situacion' }),
    ).resolves.toEqual({
      outDir: '/tmp/situacion',
    })
  })
})
