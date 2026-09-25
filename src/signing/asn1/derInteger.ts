import { derNode } from './derNode'

/** DER INTEGER of a non-negative value given as big-endian magnitude bytes or a small number. */
export const derInteger = (value: Buffer | number): Buffer => {
  let bytes = typeof value === 'number' ? Buffer.from([value]) : value
  while (bytes.length > 1 && bytes[0] === 0 && (bytes[1] ?? 0) < 0x80) {
    bytes = bytes.subarray(1)
  }
  const needsSignPad = (bytes[0] ?? 0) >= 0x80
  return derNode(
    0x02,
    needsSignPad ? Buffer.concat([Buffer.from([0]), bytes]) : bytes,
  )
}
