/** `21/11/2025 12:51:30` as `2025-11-21T12:51:30`; anything else is returned unchanged. */
export const isoFromSpanishDateTime = (value: string): string => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})(?: (\d{2}:\d{2}:\d{2}))?$/.exec(
    value,
  )
  if (!match) return value
  const [, day = '', month = '', year = '', time] = match
  const date = `${year}-${month}-${day}`
  return time ? `${date}T${time}` : date
}
