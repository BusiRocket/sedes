import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchReportPdf } from './fetchReportPdf'

const pdfClient = (
  pdf: Buffer,
): { request: HttpClient['request']; client: HttpClient } => {
  const request = vi.fn<HttpClient['request']>().mockResolvedValue({
    status: 200,
    url: 'x',
    headers: {},
    body: pdf,
    text: '',
  })
  return { request, client: { request, cookie: () => undefined } }
}

describe('fetchReportPdf', () => {
  it('downloads the announced informe', async () => {
    const pdf = Buffer.from('%PDF-1.7 informe')
    const { request, client } = pdfClient(pdf)

    const result = await fetchReportPdf(
      client,
      'S1',
      '<PREVIEWS><PREVIEW SECUENCIAL="4" TYPE="INFORME"/></PREVIEWS>',
    )

    expect(result).toEqual({
      document: { secuencial: '4', typeView: 'INFORME' },
      pdf,
    })
    expect(request).toHaveBeenCalledWith(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=4&TYPEVIEW=INFORME',
    )
  })

  it('downloads an attached documento', async () => {
    const { request, client } = pdfClient(Buffer.from('%PDF-1.4 x'))

    await fetchReportPdf(
      client,
      'S1',
      '<ATTACHMENTS><ATTACHMENT EXT="pdf" SECUENCIAL="1"/></ATTACHMENTS>',
    )

    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('SECUENCIAL=1&TYPEVIEW=DOCUMENTO'),
    )
  })

  it('throws with the screen messages when no report was generated', async () => {
    const { request, client } = pdfClient(Buffer.from(''))
    const xml =
      '<MESSAGES><MESSAGE><TEXTO><![CDATA[Usuario no Autorizado]]></TEXTO></MESSAGE></MESSAGES>'

    await expect(fetchReportPdf(client, 'S1', xml)).rejects.toThrow(
      /no informe in the response \(Usuario no Autorizado\)/,
    )
    await expect(fetchReportPdf(client, 'S1', '<x/>')).rejects.toThrow(
      /\(no message\)/,
    )
    expect(request).not.toHaveBeenCalled()
  })
})
