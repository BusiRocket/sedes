import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { listAeatInformatives } from './listAeatInformatives'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: '',
  headers: {},
  body: Buffer.from(text),
  text,
})

const listHtml = `<table id='idtablaExped'>
<tr><td>1900000000001</td><td>2025190000001</td><td></td><td>20/01/2026</td><td></td><td></td><td></td><td>Presentada</td><td>1</td></tr>
<tr><td>1900000000002</td><td>2025190000002</td><td></td><td>25/01/2026</td><td>X</td><td></td><td>1900000000001</td><td>Presentada</td><td>1</td></tr>
</table>`

const client: HttpClient = {
  request: vi.fn<HttpClient['request']>(async (url) => {
    if (url.endsWith('/BUGC-JDIT/MdcAcceso')) return Promise.resolve(page(''))
    if (url.endsWith('/SCGI-DTRA/EntradaInternetServlet'))
      return Promise.resolve(page(listHtml))
    if (url.includes('exp=2025190000001'))
      return Promise.resolve(page('CSV=AAAA111122223333'))
    if (url.includes('exp=2025190000002'))
      return Promise.resolve(page('CSV=BBBB111122223333'))
    throw new Error(`unexpected request: ${url}`)
  }),
  cookie: () => undefined,
}

describe('listAeatInformatives', () => {
  it('lists the filings with their CSVs', async () => {
    const report = await listAeatInformatives(
      client,
      'B00000000',
      { modelo: '190', ejercicio: '2025' },
      undefined,
    )
    expect(report.count).toBe(2)
    expect(report.filings.map((filing) => filing.csv)).toEqual([
      'AAAA111122223333',
      'BBBB111122223333',
    ])
    expect(report.filings[1]?.complementaria).toBe(true)
    expect(report.notes[0]).toMatch(/2020 onwards/)
  })
})
