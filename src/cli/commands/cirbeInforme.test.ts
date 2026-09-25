import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { cirbeInforme } from './cirbeInforme'

const { requestReport } = vi.hoisted(() => ({
  requestReport: vi.fn<() => Promise<unknown>>().mockResolvedValue({}),
}))
vi.mock('../../cirbe/report/requestRiskReport', () => ({
  requestRiskReport: requestReport,
}))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('cirbeInforme', () => {
  it('is an emission', () => {
    expect(cirbeInforme.effect).toBe('emit')
  })

  it('requires --nacimiento and --email', async () => {
    await expect(
      cirbeInforme.run(client, { nacimiento: '01-02-1990' }),
    ).rejects.toThrow(/--nacimiento <dd-mm-aaaa> and --email/)
  })

  it('passes the query through', async () => {
    await cirbeInforme.run(client, {
      nacimiento: '01-02-1990',
      email: 'a@b.es',
    })

    expect(requestReport).toHaveBeenCalledWith(client, {
      birthDate: '01-02-1990',
      email: 'a@b.es',
    })
  })
})
