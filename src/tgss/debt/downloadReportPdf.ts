import type { HttpClient } from '../../http/types/HttpClient'
import { tgssUrls } from '../session/tgssUrls'

/** GET the emitted document as a PDF, in the same certificate-bound session that generated it. */
export const downloadReportPdf = async (
  client: HttpClient,
  sessionId: string,
): Promise<Buffer> => {
  const response = await client.request(tgssUrls.viewDoc(sessionId))
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(`TGSS: no PDF returned (status ${String(response.status)})`)
  return response.body
}
