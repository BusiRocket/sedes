import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** GET the EMCE-JDIT servlet: the request form with its `fIslw` session token. */
export const fetchCensalEntryPage = async (
  client: HttpClient,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/EMCE-JDIT/ServletSitCenInternet`,
    { defaultCharset: 'iso-8859-1' },
  )
  return response.text
}
