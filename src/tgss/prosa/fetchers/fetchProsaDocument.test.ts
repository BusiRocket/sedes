import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchProsaDocument } from './fetchProsaDocument'

const response = (body: Buffer, status = 200): HttpResponse => ({
  status,
  url: 'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1',
  headers: {},
  body,
  text: '',
})

describe('fetchProsaDocument', () => {
  it('returns the PDF body', async () => {
    const body = Buffer.from('%PDF-1.4 rest of the document')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(response(body))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchProsaDocument(client, 'S1')).resolves.toBe(body)
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=1&TYPEVIEW=DOCUMENTO',
    )
  })

  it('asks for an informe by its announced sequence number', async () => {
    const body = Buffer.from('%PDF-1.7 informe')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(response(body))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(
      fetchProsaDocument(client, 'S1', '3', 'INFORME'),
    ).resolves.toBe(body)
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=3&TYPEVIEW=INFORME',
    )
  })

  it('throws when the body is not a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(response(Buffer.from('<html>error</html>'), 302))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchProsaDocument(client, 'S1')).rejects.toThrow(
      /no PDF returned \(status 302\)/,
    )
  })
})
