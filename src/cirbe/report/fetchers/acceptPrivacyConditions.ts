import type { HttpClient } from '../../../http/types/HttpClient'
import { postCirbe } from '../../fetchers/postCirbe'
import { paginationFields } from '../../mappers/paginationFields'
import { cirbeUrls } from '../../session/cirbeUrls'
import type { FlowState } from '../../types/FlowState'

/**
 * Sync the privacy checkbox server-side (an `ajaxSource` event). The answer is
 * empty by design, but the snapshot advances one step; skipping it makes
 * Aceptar end the flow silently.
 */
export const acceptPrivacyConditions = async (
  client: HttpClient,
  state: FlowState,
  executionKey: string,
): Promise<void> => {
  await postCirbe(
    client,
    `${cirbeUrls.requestScreen}/CondicionesPrivacidad?execution=${executionKey}&ajaxSource=true`,
    {
      CheckCondicionesPrivacidad: 'true',
      ...paginationFields,
      _eventId: 'CondicionesPrivacidad',
      IdUnico: state.idUnico,
    },
  )
}
