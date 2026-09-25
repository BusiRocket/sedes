/** One field of a raw, unvalidated portal row, coerced to a string, or empty when it is not one. */
export const readStringField = (
  record: Readonly<Record<string, unknown>>,
  key: string,
): string => {
  const value = record[key]
  return typeof value === 'string' ? value : ''
}
