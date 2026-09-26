import { gridColumnKey } from './gridColumnKey'

/** One grid row keyed by its column titles, without the action and selection columns or untitled cells. */
export const mapGridRow = (
  headers: readonly string[],
  cells: readonly string[],
): Record<string, string> => {
  const record: Record<string, string> = {}
  headers.forEach((title, index) => {
    if (['', 'Acciones', 'Selec.'].includes(title)) return
    record[gridColumnKey(title)] = cells[index] ?? ''
  })
  return record
}
