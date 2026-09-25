import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { oargtUrls } from './oargtUrls'

/**
 * Log the holder in with a plain client certificate, no Cl@ve involved: the
 * public landing page, then the private RECIBOS page it redirects to (or the
 * contact-data confirmation gate, when the office asks for one first).
 */
export const openOargtSession = async (
  client: HttpClient,
): Promise<HttpResponse> => {
  await client.request(oargtUrls.public)
  return client.request(oargtUrls.recibosCertificate)
}
