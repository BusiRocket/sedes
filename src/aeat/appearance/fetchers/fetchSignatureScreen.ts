import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/**
 * GET DetalleSede for one notification: the "firma básica" screen. Showing
 * it is not the act; the act is the POST with `accion=firma` that follows.
 */
export const fetchSignatureScreen = async (
  client: HttpClient,
  ncc: string,
): Promise<string> => {
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/GNNO-JDIT/DetalleSede?ncc=${encodeURIComponent(ncc)}`,
    { defaultCharset: 'iso-8859-15' },
  )
  if (response.status !== 200)
    throw new Error(
      `AEAT: notification ${ncc} answered HTTP ${String(response.status)}`,
    )
  return response.text
}
