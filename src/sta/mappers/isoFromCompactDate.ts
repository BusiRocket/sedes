/** `20251113` as `2025-11-13`; anything else is returned unchanged. */
export const isoFromCompactDate = (value: string): string => {
  const match = /^(\d{4})(\d{2})(\d{2})$/.exec(value)
  if (!match) return value
  const [, year = '', month = '', day = ''] = match
  return `${year}-${month}-${day}`
}
