import type { DebtReport } from './DebtReport'

/** The JSON `sedes tgss deuda` prints. */
export type TgssDebtResult = {
  readonly nif: string
  readonly hasDebt: boolean
  readonly message?: string | undefined
  readonly pdfPath?: string | undefined
  readonly report?: DebtReport | undefined
  readonly notes: readonly string[]
}
