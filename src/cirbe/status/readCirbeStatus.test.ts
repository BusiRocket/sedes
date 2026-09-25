import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { readCirbeStatus } from './readCirbeStatus'

const { list, download } = vi.hoisted(() => ({
  list: vi.fn<() => Promise<unknown[]>>(),
  download: vi.fn<() => Promise<unknown[]>>(),
}))
vi.mock('../session/openCirbeSession', () => ({
  openCirbeSession: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('./listRiskRequests', () => ({ listRiskRequests: list }))
vi.mock('../download/downloadResolvedReports', () => ({
  downloadResolvedReports: download,
}))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('readCirbeStatus', () => {
  it('only lists without --out', async () => {
    list.mockResolvedValueOnce([{ referencia: 'R1' }])

    const status = await readCirbeStatus(client)

    expect(status).toEqual({
      requests: [{ referencia: 'R1' }],
      downloaded: [],
      notes: [],
    })
    expect(download).not.toHaveBeenCalled()
  })

  it('downloads with --out and notes empty answers', async () => {
    list.mockResolvedValueOnce([])
    download.mockResolvedValueOnce([])

    const status = await readCirbeStatus(client, '/out')

    expect(download).toHaveBeenCalledWith(client, '/out')
    expect(status.notes).toHaveLength(2)
  })
})
