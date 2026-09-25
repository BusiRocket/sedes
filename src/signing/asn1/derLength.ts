/** DER length octets: short form below 128, long form (0x80 | byte count, big-endian) above. */
export const derLength = (length: number): Buffer => {
  const shortFormLimit = 0x80
  if (length < shortFormLimit) return Buffer.from([length])
  const bytes: number[] = []
  for (let rest = length; rest > 0; rest = Math.floor(rest / 256)) {
    bytes.unshift(rest % 256)
  }
  return Buffer.from([shortFormLimit + bytes.length, ...bytes])
}
