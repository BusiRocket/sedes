import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { sepePrestacion } from './sepePrestacion'

vi.mock('../../sepe/benefits/readLastBenefit', () => ({
  readLastBenefit: vi.fn(async (client: unknown) =>
    Promise.resolve({ client }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('sepePrestacion', () => {
  it('is the sepe prestacion command with no options of its own', () => {
    expect(sepePrestacion.portal).toBe('sepe')
    expect(sepePrestacion.action).toBe('prestacion')
    expect(sepePrestacion.options).toEqual([])
  })

  it('reads the last benefit with the client', async () => {
    const result = (await sepePrestacion.run(client, {})) as { client: unknown }

    expect(result.client).toBe(client)
  })
})
