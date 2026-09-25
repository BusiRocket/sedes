import { parseConceptFields } from '../parsers/parseConceptFields'
import type { Debt } from '../types/Debt'
import type { DebtDetail } from '../types/DebtDetail'
import type { DebtRow } from '../types/DebtRow'
import { classifyDebtState } from './classifyDebtState'

/** Merge a parsed row with its concept fields, collection state and optional detail. */
export const buildDebt = (
  row: DebtRow,
  detail: DebtDetail | undefined,
): Debt => ({
  clave: row.clave,
  concepto: row.concepto,
  ...parseConceptFields(row.concepto),
  pendiente: row.pendiente,
  aIngresar: row.aIngresar,
  periodoRecaudacion: row.periodoRecaudacion,
  situacion: row.situacion,
  estado: classifyDebtState(row.periodoRecaudacion, row.situacion),
  detail,
})
