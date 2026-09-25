/**
 * Upper-case the value, drop spaces, dots and hyphens and a leading `ES` VAT
 * prefix, and pad a short DNI number to 8 digits (`1234567L` is `01234567L`).
 */
export const normalizeNif = (value: string): string => {
  const vatPrefixed = 11
  const dniLength = 9
  const compact = value.toUpperCase().replaceAll(/[\s.-]/g, '')
  const withoutPrefix =
    compact.length === vatPrefixed && compact.startsWith('ES')
      ? compact.slice(2)
      : compact
  return /^\d{1,7}[A-Z]$/.test(withoutPrefix)
    ? withoutPrefix.padStart(dniLength, '0')
    : withoutPrefix
}
