/** The byte at `index`, or 0 outside the buffer (a PNG row's missing neighbour). */
export const byteOrZero = (buffer: Buffer, index: number): number =>
  index >= 0 && index < buffer.length ? buffer.readUInt8(index) : 0
