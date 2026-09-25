import type { HttpClient } from '../../http/types/HttpClient'
import { cirbeUrls } from './cirbeUrls'
import { loginWithCertificate } from './loginWithCertificate'

/**
 * Log in and initialise the app (the Home flow). The IAS answers XML carrying
 * `RespuestaIAS`; anything else (an HTML WAF page, a Cl@ve error) means the
 * session was not established.
 */
export const openCirbeSession = async (client: HttpClient): Promise<void> => {
  await loginWithCertificate(client)
  const home = await client.request(cirbeUrls.home, {
    referer: cirbeUrls.appReferer,
  })
  if (!home.text.includes('RespuestaIAS'))
    throw new Error(
      `CIRBE: session refused (HTTP ${String(home.status)} at ${home.url})`,
    )
}
