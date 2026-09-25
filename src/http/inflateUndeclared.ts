import { gunzipSync, inflateRawSync, inflateSync } from 'node:zlib'

/** Undo gzip or deflate applied without a `Content-Encoding` header; anything else comes back untouched. */
export const inflateUndeclared = (raw: Buffer): Buffer => {
  const gzipMagic = [0x1f, 0x8b]
  if (raw[0] === gzipMagic[0] && raw[1] === gzipMagic[1]) {
    try {
      return gunzipSync(raw)
    } catch {
      return raw
    }
  }
  for (const inflate of [inflateRawSync, inflateSync]) {
    try {
      return inflate(raw)
    } catch {
      // not this encoding; try the next one
    }
  }
  return raw
}
