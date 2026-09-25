/**
 * True when the first bytes are all printable ASCII or whitespace: a JSON or HTML body, not a
 * compressed stream. Sixteen such bytes in a row do not happen at the start of gzip, zlib or raw deflate output.
 */
export const looksLikeText = (raw: Buffer): boolean => {
  const probeLength = 16
  const whitespace = new Set([0x09, 0x0a, 0x0d])
  const printableStart = 0x20
  const printableEnd = 0x7e
  const length = Math.min(raw.length, probeLength)
  if (length === 0) return true
  for (let index = 0; index < length; index += 1) {
    const byte = raw[index] ?? 0
    const printable = byte >= printableStart && byte <= printableEnd
    if (!printable && !whitespace.has(byte)) return false
  }
  return true
}
