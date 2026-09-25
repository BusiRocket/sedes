import type { DebtReport } from './DebtReport'
import type { DebtReportKind } from './DebtReportKind'

/** The JSON `sedes tgss deuda` prints. */
export type TgssDebtResult = {
  readonly nif: string
  readonly kind: DebtReportKind
  readonly hasDebt: boolean
  readonly message?: string | undefined
  readonly pdfPath?: string | undefined
  readonly report?: DebtReport | undefined
  readonly notes: readonly string[]
}
