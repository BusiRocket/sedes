import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { cirbeUrls } from '../session/cirbeUrls'

/**
 * POST one IAS/WebFlow event. The Banco de España WAF answers a 404 "URL
 * rechazada" page to POSTs that lack the app Referer and Origin.
 */
export const postCirbe = async (
  client: HttpClient,
  url: string,
  form: Readonly<Record<string, string>> = {},
): Promise<HttpResponse> =>
  client.request(url, {
    method: 'POST',
    form,
    referer: cirbeUrls.appReferer,
    headers: { Origin: cirbeUrls.origin },
  })
