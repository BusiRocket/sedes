import type { Receipt } from './Receipt'

/** What `ventanilla-unica oargt recibos` answers: the receipts found, this run's totals and what is still unresolved. */
export type OargtReceiptsResult = {
  readonly contactConfirmationPending: boolean
  readonly receipts: readonly Receipt[]
  readonly totals: {
    readonly voluntaria: number
    readonly ejecutiva: number
  }
  /** True when today's amounts were requested and every enforced receipt got one. */
  readonly amountTodayAvailable: boolean
  readonly notes: readonly string[]
}
