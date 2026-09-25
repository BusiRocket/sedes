import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchReportFile } from './fetchReportFile'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('fetchReportFile', () => {
  it('returns the PDF body', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/f', '%PDF-1.7 x'))
    const client: HttpClient = { request, cookie: () => undefined }

    const pdf = await fetchReportFile(client, 'a b.pdf')

    expect(pdf.toString()).toBe('%PDF-1.7 x')
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://aps.bde.es/cir_www/gestiondeficheros/a%20b.pdf',
    )
  })

  it('throws when the answer is not a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/f', '<html>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchReportFile(client, 'x.pdf')).rejects.toThrow(
      /x.pdf did not answer a PDF \(HTTP 200\)/,
    )
  })
})
