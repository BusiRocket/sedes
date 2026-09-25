import type { DerElement } from '../types/DerElement'

/** Read the DER element starting at `offset` (single-byte tags, definite lengths). */
export const readDerElement = (der: Buffer, offset: number): DerElement => {
  const tag = der[offset]
  const first = der[offset + 1]
  if (tag === undefined || first === undefined) {
    throw new Error(`DER element truncated at offset ${String(offset)}`)
  }
  const longForm = 0x80
  let length = first
  let valueStart = offset + 2
  if (first >= longForm) {
    const count = first - longForm
    length = 0
    for (let index = 0; index < count; index += 1) {
      length = length * 256 + (der[offset + 2 + index] ?? 0)
    }
    valueStart += count
  }
  const end = valueStart + length
  if (end > der.length) throw new Error('DER element runs past the buffer')
  return { tag, start: offset, valueStart, end }
}
