import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** GET the expediente detail page, which carries the receipt's `CSV=`. */
export const fetchInformativeDetail = async (
  client: HttpClient,
  nif: string,
  expediente: string,
): Promise<string> => {
  const params = new URLSearchParams({ nif, exp: expediente, niv: '1' })
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/SCGI-DTRA/DetalleExpedienteOServlet?${params.toString()}`,
  )
  return response.text
}
