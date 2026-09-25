import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { downloadReportPdf } from './downloadReportPdf'

const response = (body: Buffer, status = 200): HttpResponse => ({
  status,
  url: 'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1',
  headers: {},
  body,
  text: '',
})

describe('downloadReportPdf', () => {
  it('returns the PDF body', async () => {
    const body = Buffer.from('%PDF-1.4 rest of the document')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(response(body))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(downloadReportPdf(client, 'S1')).resolves.toBe(body)
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=1&TYPEVIEW=DOCUMENTO',
    )
  })

  it('throws when the body is not a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(response(Buffer.from('<html>error</html>'), 302))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(downloadReportPdf(client, 'S1')).rejects.toThrow(
      /no PDF returned \(status 302\)/,
    )
  })
})
