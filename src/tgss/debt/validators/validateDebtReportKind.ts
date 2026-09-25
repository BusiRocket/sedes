import type { DebtReportKind } from '../types/DebtReportKind'

/** Accept `--tipo detallado|total`; an absent option means the detailed report. */
export const validateDebtReportKind = (
  input: string | undefined,
): DebtReportKind => {
  if (input === undefined || input === 'detallado') return 'detallado'
  if (input === 'total') return 'total'
  throw new Error(`--tipo must be detallado or total, got "${input}"`)
}
