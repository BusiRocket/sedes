import type { XrefOffset } from '../types/XrefOffset'

/** One uncompressed xref stream row for /W [1 4 2]: type 1, offset, generation. */
export const xrefStreamRow = (entry: XrefOffset): Buffer => {
  const row = Buffer.alloc(7)
  row.writeUInt8(1, 0)
  row.writeUInt32BE(entry.offset, 1)
  row.writeUInt16BE(entry.gen, 5)
  return row
}
