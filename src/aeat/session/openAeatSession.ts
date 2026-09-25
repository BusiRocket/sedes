import type { HttpClient } from '../../http/types/HttpClient'
import { aeatBaseUrl } from './aeatBaseUrl'

/** GET MdcAcceso with the certificate: sets the session cookies every other call needs. */
export const openAeatSession = async (client: HttpClient): Promise<void> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/BUGC-JDIT/MdcAcceso`,
  )
  // A certificate the portal does not accept for this service answers 403
  // and every later page would be an empty shell parsed as "no debts".
  if (response.status !== 200)
    throw new Error(
      `AEAT: session refused (HTTP ${String(response.status)}); the certificate is not accepted for this service`,
    )
}
