import type { Receipt } from './Receipt'

/** What `sedes oargt recibos` answers: the receipts found, this run's totals and what is still unresolved. */
export type OargtReceiptsResult = {
  readonly contactConfirmationPending: boolean
  readonly receipts: readonly Receipt[]
  readonly totals: {
    readonly voluntaria: number
    readonly ejecutiva: number
  }
  readonly amountTodayAvailable: false
  readonly notes: readonly string[]
}
