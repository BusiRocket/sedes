import type { Debt } from './Debt'
import type { DebtDetail } from './DebtDetail'
import type { DebtRow } from './DebtRow'
import { classifyDebtState } from './classifyDebtState'
import { parseConceptFields } from './parseConceptFields'

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
