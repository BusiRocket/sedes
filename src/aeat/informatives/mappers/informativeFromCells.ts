import { isoDateFromSpanish } from '../../payments/mappers/isoDateFromSpanish'
import type { InformativeFiling } from '../types/InformativeFiling'

/**
 * One row of `table#idtablaExped`: justificante, expediente, periodo,
 * fecha, complementaria, sustitutiva, previous justificante, estado. An
 * empty periodo is the annual `0A`. The header row is plain `<td>` cells
 * too, so a row counts only when its expediente is numeric.
 */
export const informativeFromCells = (
  cells: readonly string[],
): InformativeFiling | undefined => {
  const columns = 8
  if (cells.length < columns) return undefined
  const at = (index: number): string => cells[index] ?? ''
  const expediente = at(1)
  if (!/^\d+$/.test(expediente)) return undefined
  const periodo = at(2)
  return {
    justificante: at(0),
    expediente,
    periodo: periodo === '' ? '0A' : periodo,
    fechaPresentacion: isoDateFromSpanish(at(3)),
    complementaria: at(4) !== '',
    sustitutiva: at(5) !== '',
    estado: at(7),
  }
}
