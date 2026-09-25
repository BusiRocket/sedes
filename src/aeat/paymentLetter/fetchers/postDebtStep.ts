import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** POST one SRVO-JDIT servlet of the debt chain and return its ISO-8859-15 page. */
export const postDebtStep = async (
  client: HttpClient,
  servlet: string,
  form: Readonly<Record<string, string>>,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/SRVO-JDIT/${servlet}`,
    { method: 'POST', form, defaultCharset: 'iso-8859-15' },
  )
  if (response.status !== 200)
    throw new Error(`AEAT: ${servlet} answered HTTP ${String(response.status)}`)
  return response.text
}
