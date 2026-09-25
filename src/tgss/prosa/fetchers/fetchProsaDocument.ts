import type { HttpClient } from '../../../http/types/HttpClient'
import { tgssUrls } from '../../session/tgssUrls'

/**
 * Download one document the Prosa session has generated. The debt report is
 * `SECUENCIAL=1&TYPEVIEW=DOCUMENTO`; an informe (vida laboral) is
 * `TYPEVIEW=INFORME` with the SECUENCIAL its PREVIEW announced.
 */
export const fetchProsaDocument = async (
  client: HttpClient,
  sessionId: string,
  secuencial = '1',
  typeView: 'DOCUMENTO' | 'INFORME' = 'DOCUMENTO',
): Promise<Buffer> => {
  const response = await client.request(
    tgssUrls.viewDoc(sessionId, secuencial, typeView),
  )
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(`TGSS: no PDF returned (status ${String(response.status)})`)
  return response.body
}
