import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { dehuDocumentos } from './dehuDocumentos'

const { download } = vi.hoisted(() => ({
  download: vi.fn<() => Promise<unknown>>().mockResolvedValue({ ok: true }),
}))
vi.mock('../../dehu/documents/downloadNotificationDocuments', () => ({
  downloadNotificationDocuments: download,
}))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('dehuDocumentos', () => {
  it('requires --out', async () => {
    await expect(dehuDocumentos.run(client, {})).rejects.toThrow(
      /--out <dir> is required/,
    )
  })

  it('defaults the year and splits --id on commas', async () => {
    await dehuDocumentos.run(client, { out: '/tmp/x', id: 'N1, N2,,' })

    expect(download).toHaveBeenCalledWith(
      client,
      { year: new Date().getFullYear(), ids: ['N1', 'N2'] },
      '/tmp/x',
    )
  })

  it('rejects a year that is not a whole number', async () => {
    await expect(
      dehuDocumentos.run(client, { out: '/tmp/x', year: 'twenty' }),
    ).rejects.toThrow(/--year must be a whole year number/)
  })
})
