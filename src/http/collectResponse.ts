import type { IncomingMessage } from 'node:http'

import type { CookieJar } from './CookieJar'
import { decodeBody } from './decodeBody'
import { maxBodyBytes } from './maxBodyBytes'
import type { HttpResponse } from './types/HttpResponse'

/** Drain one response, store its cookies for the host and decode the body; a body over `maxBodyBytes` is refused. */
export const collectResponse = async (
  res: IncomingMessage,
  url: string,
  jar: CookieJar,
  defaultCharset: string | undefined,
): Promise<HttpResponse> => {
  const chunks: Buffer[] = []
  let received = 0
  for await (const chunk of res) {
    received += (chunk as Buffer).length
    if (received > maxBodyBytes) {
      res.destroy()
      throw new Error(
        `response from ${url} exceeds ${String(maxBodyBytes)} bytes`,
      )
    }
    chunks.push(chunk as Buffer)
  }
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
