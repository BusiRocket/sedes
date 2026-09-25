import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatDeclaraciones } from './aeatDeclaraciones'

vi.mock('../../aeat/filings/listAeatFilings', () => ({
  listAeatFilings: vi.fn(async (...args: unknown[]) => Promise.resolve(args)),
}))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('aeatDeclaraciones', () => {
  it('requires the nif, the modelo and the ejercicio', async () => {
    await expect(
      aeatDeclaraciones.run(client, { nif: '1', modelo: '303' }),
    ).rejects.toThrow(/--nif, --modelo and --ejercicio are required/)
  })

  it('passes the query and the output directory through', async () => {
    await expect(
      aeatDeclaraciones.run(client, {
        nif: '12345678Z',
        modelo: '303',
        ejercicio: '2025',
        periodo: '1T',
        out: '/tmp/out',
      }),
    ).resolves.toEqual([
      client,
      '12345678Z',
      { modelo: '303', ejercicio: '2025', periodo: '1T' },
      '/tmp/out',
    ])
    expect(aeatDeclaraciones).toMatchObject({
      portal: 'aeat',
      action: 'declaraciones',
      options: ['nif', 'modelo', 'ejercicio', 'periodo'],
    })
  })
})
