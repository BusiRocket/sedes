import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { postCirbe } from '../../fetchers/postCirbe'
import { paginationFields } from '../../mappers/paginationFields'
import { cirbeUrls } from '../../session/cirbeUrls'
import type { SubmitReportParams } from '../types/SubmitReportParams'

/** Post the Aceptar event: registers the report request (the only form fields the portal requires are birth date and e-mail). */
export const submitReportRequest = async (
  client: HttpClient,
  params: SubmitReportParams,
): Promise<HttpResponse> =>
  postCirbe(
    client,
    `${cirbeUrls.requestScreen}/Aceptar?execution=${params.executionKey}`,
    {
      CheckCondicionesPrivacidad: 'true',
      'DatosPeticion.FechaNacimiento': params.query.birthDate,
      'DatosPeticion.CorreoElectronico': params.query.email,
      'DatosPeticion.NIE': '',
      ...paginationFields,
      _eventId: 'Aceptar',
      IdUnico: params.state.idUnico,
    },
  )
