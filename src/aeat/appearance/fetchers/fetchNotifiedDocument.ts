import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** POST DetalleSede `accion=vernotif`: the notified act as a PDF, after the comparecencia. */
export const fetchNotifiedDocument = async (
  client: HttpClient,
  ncc: string,
): Promise<Buffer> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/GNNO-JDIT/DetalleSede`,
    { method: 'POST', form: { accion: 'vernotif', ncc } },
  )
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(
      `AEAT: notification ${ncc} did not answer a PDF (status ${String(response.status)})`,
    )
  return response.body
}
