import type { HttpClient } from '../http/HttpClient'
import { aeatBaseUrl } from './aeatBaseUrl'

/** POST DetalleDda for one clave; an empty 'Datos generales' section is not an error. */
export const fetchDebtDetail = async (
  client: HttpClient,
  nif: string,
  clave: string,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/SRVO-JDIT/DetalleDda`,
    {
      method: 'POST',
      form: {
        fnif: nif,
        fliquidacion: clave,
        faccion: 'DETALLE_DDA',
        faccionboton: '',
        faccionorigen: 'CONS_DDAS',
        faccionorigen2: 'CONS_DDAS',
        fmigas: '1',
        fnddasemb: '3',
        fcostas: '0',
      },
      defaultCharset: 'iso-8859-15',
    },
  )
  return response.text
}
