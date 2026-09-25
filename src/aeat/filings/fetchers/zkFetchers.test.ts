import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchFilingCsv } from './fetchFilingCsv'
import { fetchFilingPdf } from './fetchFilingPdf'
import { fetchSearchPage } from './fetchSearchPage'
import { postZkEvent } from './postZkEvent'

const page = (text: string, body = Buffer.from(text)): HttpResponse => ({
  status: 200,
  url: 'https://www1.agenciatributaria.gob.es/x',
  headers: {},
  body,
  text,
})

describe('fetchSearchPage', () => {
  it('retries once when the page comes without the ZK mount', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('<html>empty shell</html>'))
      .mockResolvedValueOnce(page("mounted dt:'z_1'"))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchSearchPage(client)).resolves.toBe("mounted dt:'z_1'")
    expect(request).toHaveBeenCalledTimes(2)
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/SCEJ-MANT/CONSUL/index.zul',
    )
  })

  it('returns the last answer after the retry so the parser names the problem', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('shell'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchSearchPage(client)).resolves.toBe('shell')
    expect(request).toHaveBeenCalledTimes(2)
  })
})

describe('postZkEvent', () => {
  it('posts the event fields in the browser order with the page as referer', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(page('ok'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(
      postZkEvent(client, 'z_1-2', {
        cmd: 'onSelect',
        uuid: 'cM1',
        data: { items: ['iM303'], reference: 'iM303' },
      }),
    ).resolves.toBe('ok')
    const [url, options] = request.mock.calls[0] ?? []
    expect(url).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/SCEJ-MANT/zkau',
    )
    expect(options?.method).toBe('POST')
    expect(Object.keys(options?.form ?? {})).toEqual([
      'dtid',
      'cmd_0',
      'uuid_0',
      'data_0',
    ])
    expect(options?.form?.['data_0']).toBe(
      '{"items":["iM303"],"reference":"iM303"}',
    )
    expect(options?.referer).toContain('/SCEJ-MANT/CONSUL/index.zul')
  })
})

describe('fetchFilingCsv', () => {
  it('clicks the Ver button and reads the CSV', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page("src:'CotejoDocIdSv?CSV=ABC123'"))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchFilingCsv(client, 'z_1', 'v1')).resolves.toBe('ABC123')
    expect(request.mock.calls[0]?.[1]?.form?.['cmd_0']).toBe('onClick')
    expect(request.mock.calls[0]?.[1]?.form?.['uuid_0']).toBe('v1')
  })
})

describe('fetchFilingPdf', () => {
  it('downloads the receipt PDF the CSV resolves to', async () => {
    const pdf = Buffer.from('%PDF-1.4 receipt')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('', pdf))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchFilingPdf(client, 'ABC123')).resolves.toEqual(pdf)
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/KATA-APLI/cotejo/CotejoDocIdSv?CSV=ABC123',
    )
  })

  it('refuses an answer that is not a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('<html>error</html>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchFilingPdf(client, 'ABC123')).rejects.toThrow(
      /CSV ABC123 did not resolve to a PDF/,
    )
  })
})
