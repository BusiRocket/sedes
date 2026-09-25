import type { HttpClient } from '../../../http/types/HttpClient'
import { cirbeUrls } from '../../session/cirbeUrls'

/** GET a released report file; throws unless the body is a PDF. */
export const fetchReportFile = async (
  client: HttpClient,
  fichero: string,
): Promise<Buffer> => {
  const response = await client.request(cirbeUrls.file(fichero), {
    referer: cirbeUrls.appReferer,
  })
  if (response.body.subarray(0, 4).toString('latin1') !== '%PDF')
    throw new Error(
      `CIRBE: ${fichero} did not answer a PDF (HTTP ${String(response.status)})`,
    )
  return response.body
}
