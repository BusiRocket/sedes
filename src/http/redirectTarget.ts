import type { HttpResponse } from './types/HttpResponse'

/** The absolute URL a 3xx response points to, or undefined when the response is not a redirect. */
export const redirectTarget = (
  response: HttpResponse,
  requestUrl: string,
): string | undefined => {
  const redirectStatuses = new Set([301, 302, 303, 307, 308])
  const location = response.headers['location']
  if (!redirectStatuses.has(response.status) || typeof location !== 'string')
    return undefined
  return new URL(location, requestUrl).toString()
}
