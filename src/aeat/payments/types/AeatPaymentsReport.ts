import type { AeatPayment } from './AeatPayment'

/** What `sedes aeat pagos` prints: every payment MisPagos lists for the holder. */
export type AeatPaymentsReport = {
  readonly nif: string
  readonly entity?: string | undefined
  readonly payments: readonly AeatPayment[]
  /** Sum of every payment in euros, counted in cents. */
  readonly total: number
  readonly notes: readonly string[]
}
