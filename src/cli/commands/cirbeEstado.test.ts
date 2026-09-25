import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { cirbeEstado } from './cirbeEstado'

const { readStatus } = vi.hoisted(() => ({
  readStatus: vi.fn<() => Promise<unknown>>().mockResolvedValue({}),
}))
vi.mock('../../cirbe/status/readCirbeStatus', () => ({
  readCirbeStatus: readStatus,
}))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('cirbeEstado', () => {
  it('is a read that passes --out through', async () => {
    await cirbeEstado.run(client, { out: '/out' })

    expect(cirbeEstado.effect).toBeUndefined()
    expect(readStatus).toHaveBeenCalledWith(client, '/out')
  })
})
