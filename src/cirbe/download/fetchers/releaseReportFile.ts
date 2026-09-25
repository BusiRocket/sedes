import type { HttpClient } from '../../../http/types/HttpClient'
import { postCirbe } from '../../fetchers/postCirbe'
import { cirbeUrls } from '../../session/cirbeUrls'
import type { FlowState } from '../../types/FlowState'

/** The `muestraFicheroIAS` event: without it the file URL answers nothing. */
export const releaseReportFile = async (
  client: HttpClient,
  state: FlowState,
): Promise<void> => {
  await postCirbe(
    client,
    `${cirbeUrls.downloadRelease}?execution=${state.executionKey ?? 'e1s1'}`,
    { _eventId: 'muestraFicheroIAS', IdUnico: state.idUnico },
  )
}
