import type { HttpRequestOptions } from './HttpRequestOptions'
import type { HttpResponse } from './HttpResponse'

/** A cookie-keeping, certificate-bearing HTTP client bound to one holder. */
export type HttpClient = {
  request(url: string, options?: HttpRequestOptions): Promise<HttpResponse>
  cookie(host: string, name: string): string | undefined
}
