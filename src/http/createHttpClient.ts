import type { CertificateIdentity } from '../certificate/types/CertificateIdentity'
import { CookieJar } from './CookieJar'
import { isAdministrationHost } from './isAdministrationHost'
import { performRequest } from './performRequest'
import { redirectTarget } from './redirectTarget'
import type { HttpClient } from './types/HttpClient'
import type { HttpRequestOptions } from './types/HttpRequestOptions'
import type { HttpResponse } from './types/HttpResponse'

/**
 * Build the client one holder uses against every portal: the certificate is
 * offered on each TLS handshake, cookies persist per host family, and
 * redirects are followed as a browser would (a 3xx after a POST becomes a GET),
 * but never to another host outside the administrations, which would receive
 * the certificate on its handshake.
 */
export const createHttpClient = (identity: CertificateIdentity): HttpClient => {
  const jar = new CookieJar()
  const maxRedirects = 10
  const request = async (
    url: string,
    options: HttpRequestOptions = {},
  ): Promise<HttpResponse> => {
    let current = url
    let currentOptions = options
    for (let hop = 0; hop <= maxRedirects; hop += 1) {
      const response = await performRequest(
        current,
        identity,
        jar,
        currentOptions,
      )
      const next =
        options.followRedirects === false
          ? undefined
          : redirectTarget(response, current)
      if (next === undefined) return response
      const nextHost = new URL(next).hostname
      if (
        nextHost !== new URL(current).hostname &&
        !isAdministrationHost(nextHost)
      )
        throw new Error(`refused redirect from ${current} to ${nextHost}`)
      current = next
      currentOptions = {
        headers: options.headers,
        referer: current,
        defaultCharset: options.defaultCharset,
        timeoutMs: options.timeoutMs,
        method: 'GET',
      }
    }
    throw new Error(`too many redirects from ${url}`)
  }
  return { request, cookie: (host, name) => jar.get(host, name) }
}
