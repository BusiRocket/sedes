import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { tgssBases } from './tgssBases'

vi.mock('../../tgss/contributions/emitContributionsReport', () => ({
  emitContributionsReport: vi.fn(
    async (_client: unknown, query: unknown, outDir: unknown) =>
      Promise.resolve({ query, outDir }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('tgssBases', () => {
  it('defaults --ejercicio to the current year', async () => {
    const result = (await tgssBases.run(client, {})) as {
      query: { ejercicio: string }
    }

    expect(result.query.ejercicio).toBe(String(new Date().getFullYear()))
  })

  it('passes --ejercicio and --out through', async () => {
    await expect(
      tgssBases.run(client, { ejercicio: '2025', out: '/tmp/bases' }),
    ).resolves.toEqual({ query: { ejercicio: '2025' }, outDir: '/tmp/bases' })
  })
})
