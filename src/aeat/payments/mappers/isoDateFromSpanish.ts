/** `05/06/2026` -> `2026-06-05`; anything else is returned as printed. */
export const isoDateFromSpanish = (text: string): string => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim())
  if (!match) return text.trim()
  const [, day, month, year] = match
  return `${year ?? ''}-${month ?? ''}-${day ?? ''}`
}
