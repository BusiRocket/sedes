/** Percent-encode one value byte by byte in Latin-1, leaving RFC 3986 unreserved bytes bare. */
export const encodeLatin1Value = (value: string): string =>
  [...Buffer.from(value, 'latin1')]
    .map((byte) => {
      const char = String.fromCharCode(byte)
      return /[\w\-.~]/.test(char)
        ? char
        : `%${byte.toString(16).toUpperCase().padStart(2, '0')}`
    })
    .join('')
