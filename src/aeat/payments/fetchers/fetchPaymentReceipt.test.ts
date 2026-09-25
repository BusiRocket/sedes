import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchPaymentReceipt } from './fetchPaymentReceipt'

const answer = (body: string, status = 200): HttpResponse => ({
  status,
  url: 'https://www1.agenciatributaria.gob.es/wlpl/OVPP-PAGO/ImpresionPDF',
  headers: {},
  body: Buffer.from(body),
  text: body,
})

describe('fetchPaymentReceipt', () => {
  it('returns the PDF bytes of the NRC', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer('%PDF-1.4 fixture'))
    const client: HttpClient = { request, cookie: () => undefined }

    const pdf = await fetchPaymentReceipt(client, '1026110000002JKLMNOPQR')

    expect(pdf.toString()).toBe('%PDF-1.4 fixture')
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/OVPP-PAGO/ImpresionPDF?nrc=1026110000002JKLMNOPQR',
    )
  })

  it('throws when the answer is not a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer('<html>error</html>', 500))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchPaymentReceipt(client, 'X')).rejects.toThrow(
      /no PDF returned.*500/,
    )
  })
})
