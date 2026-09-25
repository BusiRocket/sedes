import type { HttpClient } from '../../http/types/HttpClient'
import { readProsaPayload } from './readProsaPayload'
import { tgssUrls } from './tgssUrls'
import type { ProsaSession } from './types/ProsaSession'
import { walkSamlChain } from './walkSamlChain'

/**
 * Open one Prosa service (`AECPSED1`, the debt report, by default): enter
 * through OnlineAccess, walk the Cl@ve/IPCE SAML chain with the caller's
 * certificate and read the Prosa ticket, payload and endpoint session id the
 * later POSTs need.
 */
export const loginWithCertificate = async (
  client: HttpClient,
  app = 'AECPSED1',
): Promise<ProsaSession> => {
  const prosaHost = 'sp.seg-social.es'
  const entry = await client.request(tgssUrls.loginEntry(app))
  const landed = await walkSamlChain(client, entry)
  const payload = readProsaPayload(landed.text)
  const sessionId = client.cookie(prosaHost, 'JSESSIONID_endPoint')
  if (!sessionId)
    throw new Error('TGSS: no JSESSIONID_endPoint cookie after login')
  return { ticket: payload.ticket, sessionId, xml: payload.xml }
}
