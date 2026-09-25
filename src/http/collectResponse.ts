import type { IncomingMessage } from 'node:http'

import type { CookieJar } from './CookieJar'
import { decodeBody } from './decodeBody'
import type { HttpResponse } from './HttpResponse'

/** Drain one response, store its cookies for the host and decode the body. */
export const collectResponse = async (
  res: IncomingMessage,
  url: string,
  jar: CookieJar,
  defaultCharset: string | undefined,
): Promise<HttpResponse> => {
  const chunks: Buffer[] = []
  for await (const chunk of res) chunks.push(chunk as Buffer)
  jar.store(new URL(url).hostname, res.headers['set-cookie'] ?? [])
  const decoded = decodeBody(
    Buffer.concat(chunks),
    res.headers['content-type'],
    defaultCharset,
  )
  return {
    status: res.statusCode ?? 0,
    url,
    headers: res.headers,
    body: decoded.body,
    text: decoded.text,
  }
}
