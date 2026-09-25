import type { HttpClient } from '../../../http/types/HttpClient'
import { postCirbe } from '../../fetchers/postCirbe'
import { selectedRecordFields } from '../../mappers/selectedRecordFields'
import { readFlowState } from '../../parsers/readFlowState'
import { cirbeUrls } from '../../session/cirbeUrls'
import type { DownloadStep } from '../../types/DownloadStep'

/** Select one report file of the request (`Informe Detallado` or `Informe Global`): the answer names its `Fichero`. */
export const postReportFileChoice = async (
  client: HttpClient,
  step: DownloadStep,
  response: Readonly<Record<string, string>>,
): Promise<DownloadStep> => {
  const keys = [
    'PeriodoSolicitado',
    'FechaRespuesta',
    'TipoRespuesta',
    'FechaMaximaDescarga',
    'Descargado',
    'IdentificadorRespuesta',
    'Nulo',
  ]
  const answer = await postCirbe(
    client,
    `${cirbeUrls.downloadSelect}?execution=${step.state.executionKey ?? 'e1s1'}`,
    {
      ...selectedRecordFields(
        'RelacionesRespuestasSeleccionado',
        response,
        keys,
      ),
      _eventId: 'Descargar',
      IdUnico: step.state.idUnico,
    },
  )
  return {
    state: readFlowState(answer.text, 'DescargarSolicitudesRiesgos/Descargar'),
    xml: answer.text,
  }
}
