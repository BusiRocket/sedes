import type { StaRow } from '../types/StaRow'

/** A dataset field as trimmed text; absent or non-scalar fields read as ''. */
export const readText = (row: StaRow, key: string): string => {
  const value = row[key]
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number') return String(value)
  return ''
}
