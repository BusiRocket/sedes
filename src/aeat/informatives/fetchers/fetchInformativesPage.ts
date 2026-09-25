import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'
import type { InformativesQuery } from '../types/InformativesQuery'

/**
 * POST the SCGI-DTRA consultation for one modelo and ejercicio. The servlet
 * answers a 302 the client follows; the NIF field is mandatory.
 */
export const fetchInformativesPage = async (
  client: HttpClient,
  nif: string,
  query: InformativesQuery,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/SCGI-DTRA/EntradaInternetServlet`,
    {
      method: 'POST',
      form: {
        cmb_ejercicio: query.ejercicio,
        cmb_nifdeclarante: nif,
        MODELO: query.modelo,
        fAccion: '1',
        formEntra: 'formEntra',
      },
    },
  )
  return response.text
}
