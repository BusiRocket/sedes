import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** GET the official "justificante de pago" PDF of one NRC. */
export const fetchPaymentReceipt = async (
  client: HttpClient,
  nrc: string,
): Promise<Buffer> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/OVPP-PAGO/ImpresionPDF?nrc=${encodeURIComponent(nrc)}`,
  )
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(
      `AEAT: no PDF returned for the payment receipt (status ${String(response.status)})`,
    )
  return response.body
}
