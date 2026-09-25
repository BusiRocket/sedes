import type { HttpClient } from '../../../http/types/HttpClient'
import { readProsaPayload } from '../../session/readProsaPayload'
import { tgssUrls } from '../../session/tgssUrls'
import type { ProsaSession } from '../../session/types/ProsaSession'
import { prosaCommonFields } from '../prosaCommonFields'
import type { ProsaPayload } from '../types/ProsaPayload'

/**
 * Press one Prosa button: POST the screen's fields plus `SPM.ACC.<action>`
 * with the common fields and the session's current ticket, and read the
 * screen that answers.
 */
export const fetchProsaAction = async (
  client: HttpClient,
  session: ProsaSession,
  action: string,
  fields: Readonly<Record<string, string>> = {},
): Promise<ProsaPayload> => {
  const response = await client.request(tgssUrls.postForm(session.sessionId), {
    method: 'POST',
    form: {
      ...prosaCommonFields(session.ticket),
      ...fields,
      [`SPM.ACC.${action}`]: action,
    },
  })
  return readProsaPayload(response.text)
}
