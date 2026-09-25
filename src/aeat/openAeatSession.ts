import type { HttpClient } from '../http/HttpClient'
import { aeatBaseUrl } from './aeatBaseUrl'

/** GET MdcAcceso with the certificate: sets the session cookies every other call needs. */
export const openAeatSession = async (client: HttpClient): Promise<void> => {
  await client.request(`${aeatBaseUrl}/wlpl/BUGC-JDIT/MdcAcceso`)
}
