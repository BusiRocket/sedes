import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** POST ConsultaDdas: the 'Relación de deudas' page for one NIF, ISO-8859-15. */
export const fetchDebtList = async (
  client: HttpClient,
  nif: string,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/SRVO-JDIT/ConsultaDdas`,
    {
      method: 'POST',
      form: {
        fnif: nif,
        faccion: 'CONS_DDAS',
        faccionboton: 'SALTAR',
        flistadoselecc: '',
        ACEPTAR: 'Aceptar',
      },
      defaultCharset: 'iso-8859-15',
    },
  )
  return response.text
}
