import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { downloadResolvedReports } from './downloadResolvedReports'

const { download } = vi.hoisted(() => ({
  download: vi.fn<(c: unknown, tipo: string) => Promise<unknown>>(),
}))
vi.mock('./downloadRiskReport', () => ({ downloadRiskReport: download }))

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(),
  cookie: () => undefined,
}

describe('downloadResolvedReports', () => {
  it('fetches the detailed then the global report and keeps what exists', async () => {
    download
      .mockResolvedValueOnce({ tipo: 'Informe Detallado' })
      .mockResolvedValueOnce(undefined)

    const reports = await downloadResolvedReports(client, '/out')

    expect(reports).toEqual([{ tipo: 'Informe Detallado' }])
    expect(download.mock.calls.map((call) => call[1])).toEqual([
      'Informe Detallado',
      'Informe Global',
    ])
  })
})
