import { gunzipSync, inflateRawSync, inflateSync } from 'node:zlib'
import { looksLikeText } from './looksLikeText'
import { maxBodyBytes } from './maxBodyBytes'

/**
 * Undo gzip or deflate applied without a `Content-Encoding` header; anything else comes back untouched.
 * A body that reads as text is returned as is: `inflateRawSync` accepts some JSON as a raw deflate
 * stream and answers one garbage byte without throwing (OARGT `submitAjax.aa`, 2026-09-25).
 * Output is capped at `maxBodyBytes`: a stream that expands past it is left compressed.
 */
export const inflateUndeclared = (raw: Buffer): Buffer => {
  if (looksLikeText(raw)) return raw
  const gzipMagic = [0x1f, 0x8b]
  if (raw[0] === gzipMagic[0] && raw[1] === gzipMagic[1]) {
    try {
      return gunzipSync(raw, { maxOutputLength: maxBodyBytes })
    } catch {
      return raw
    }
  }
  for (const inflate of [inflateRawSync, inflateSync]) {
    try {
      return inflate(raw, { maxOutputLength: maxBodyBytes })
    } catch {
      // not this encoding; try the next one
    }
  }
  return raw
}
