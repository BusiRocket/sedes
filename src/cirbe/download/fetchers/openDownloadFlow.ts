import type { HttpClient } from '../../../http/types/HttpClient'
import { postCirbe } from '../../fetchers/postCirbe'
import { selectedRecordFields } from '../../mappers/selectedRecordFields'
import { readFlowState } from '../../parsers/readFlowState'
import { cirbeUrls } from '../../session/cirbeUrls'
import type { DownloadStep } from '../../types/DownloadStep'

/** Select one listed request ("Descargar" on its row): the answer lists the report files it produced. */
export const openDownloadFlow = async (
  client: HttpClient,
  list: DownloadStep,
  record: Readonly<Record<string, string>>,
): Promise<DownloadStep> => {
  const keys = [
    'FECHASOLICITUD',
    'REFERENCIA',
    'PERIODOSOLICITADO',
    'ESTADO',
    'FECHAOBTENCION',
  ]
  const response = await postCirbe(
    client,
    `${cirbeUrls.downloadStart}?execution=${list.state.executionKey ?? 'e1s1'}`,
    {
      ...selectedRecordFields(
        'RegistrosSolicitudesRiesgosSeleccionado',
        record,
        keys,
      ),
      'Paginacion.PaginaActual': '1',
      _eventId: 'Descargar',
      IdUnico: list.state.idUnico,
    },
  )
  return {
    state: readFlowState(response.text, 'ConsultaEstadoRiesgos/Descargar'),
    xml: response.text,
  }
}
