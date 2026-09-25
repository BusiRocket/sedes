import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/** GET the modelo 036 `index.zul`: a fresh ZK desktop for the certificate holder. */
export const fetchM036Form = async (client: HttpClient): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/BU36-M036/MOD036/index.zul`,
  )
  if (response.status !== 200)
    throw new Error(
      `AEAT: the 036 form answered HTTP ${String(response.status)}`,
    )
  return response.text
}
