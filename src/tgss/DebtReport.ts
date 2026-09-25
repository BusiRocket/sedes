import type { DebtDocument } from './DebtDocument'

/** The parsed "informe de deuda exigible": its total and the debt documents behind it. */
export type DebtReport = {
  readonly totalExigible: string
  readonly totalExigibleEuros: number
  readonly documentos: readonly DebtDocument[]
  readonly referenciaVerificacion: string | undefined
}
