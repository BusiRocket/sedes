import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** GET VerPdfWlpl: the carta de pago PDF for a justificante. */
export const fetchLetterPdf = async (
  client: HttpClient,
  ncc: string,
  justificante: string,
): Promise<Buffer> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/inwinvoc/es.aeat.dit.adu.srem.utilidades.VerPdfWlpl?ncc=${encodeURIComponent(ncc)}&claveAplic=${encodeURIComponent(justificante)}`,
  )
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(
      `AEAT: carta de pago ${justificante} did not answer a PDF (status ${String(response.status)})`,
    )
  return response.body
}
