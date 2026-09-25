/** `16-09-2026` or `16/09/2026` -> `2026-09-16`; anything else is returned trimmed. */
export const isoDateFromDashed = (text: string): string => {
  const match = /^(\d{2})[-/](\d{2})[-/](\d{4})$/.exec(text.trim())
  if (!match) return text.trim()
  const [, day = '', month = '', year = ''] = match
  return `${year}-${month}-${day}`
}
