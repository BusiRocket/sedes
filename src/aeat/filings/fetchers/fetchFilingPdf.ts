import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** The official receipt PDF a CSV resolves to at the cotejo service. */
export const fetchFilingPdf = async (
  client: HttpClient,
  csv: string,
): Promise<Buffer> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/KATA-APLI/cotejo/CotejoDocIdSv?CSV=${encodeURIComponent(csv)}`,
  )
  const pdfMagic = '%PDF'
  if (
    response.body.subarray(0, pdfMagic.length).toString('latin1') !== pdfMagic
  )
    throw new Error(
      `AEAT: CSV ${csv} did not resolve to a PDF (status ${String(response.status)})`,
    )
  return response.body
}
