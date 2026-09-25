import type { HttpClient } from '../../http/types/HttpClient'
import { readFlowState } from '../parsers/readFlowState'
import { cirbeUrls } from '../session/cirbeUrls'
import type { DownloadStep } from '../types/DownloadStep'
import { postCirbe } from './postCirbe'

/** Start the `ConsultaSolicitudesRiesgos` flow: the holder's report requests and the flow state to act on them. */
export const fetchRequestsList = async (
  client: HttpClient,
): Promise<DownloadStep> => {
  const response = await postCirbe(client, cirbeUrls.requestsList)
  return {
    state: readFlowState(response.text, 'ConsultaSolicitudesRiesgos'),
    xml: response.text,
  }
}
