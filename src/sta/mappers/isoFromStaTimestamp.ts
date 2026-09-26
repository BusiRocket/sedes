/**
 * The STA's serialised Java calendar (`{year, month, day, hour, minute,
 * second}`) as a local `YYYY-MM-DDTHH:MM:SS`; '' when the field is absent.
 */
export const isoFromStaTimestamp = (value: unknown): string => {
  if (typeof value !== 'object' || value === null) return ''
  const parts = value as Readonly<Record<string, unknown>>
  const pad = (key: string, width: number): string =>
    String(typeof parts[key] === 'number' ? parts[key] : 0).padStart(width, '0')
  return `${pad('year', 4)}-${pad('month', 2)}-${pad('day', 2)}T${pad('hour', 2)}:${pad('minute', 2)}:${pad('second', 2)}`
}
