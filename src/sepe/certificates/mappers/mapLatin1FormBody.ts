/**
 * A form body percent-encoded as ISO-8859-1, the charset the SEPE sede
 * reads (`tipo=De situación` must arrive with `ó` as the byte 0xF3, which
 * `URLSearchParams` would send as UTF-8). Characters outside Latin-1 become
 * `?`, as a browser submitting the page would do.
 */
export const mapLatin1FormBody = (
  fields: Readonly<Record<string, string>>,
): string => {
  const unreserved = /[\w.~-]/
  const latin1Max = 0xff
  const asciiMax = 0x7f
  const questionMark = 0x3f
  const space = 0x20
  const encodeLatin1 = (value: string): string =>
    Array.from(value, (char) => {
      const codePoint = char.codePointAt(0) ?? questionMark
      const byte = codePoint > latin1Max ? questionMark : codePoint
      if (byte === space) return '+'
      if (byte <= asciiMax && unreserved.test(char)) return char
      return `%${byte.toString(16).toUpperCase().padStart(2, '0')}`
    }).join('')
  return Object.entries(fields)
    .map(([name, value]) => `${encodeLatin1(name)}=${encodeLatin1(value)}`)
    .join('&')
}
