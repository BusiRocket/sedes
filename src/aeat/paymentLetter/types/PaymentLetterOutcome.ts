import type { DebtRow } from '../../debts/types/DebtRow'

/** The plan for a carta de pago, and whether the confirmed run may proceed. */
export type PaymentLetterOutcome = {
  readonly plan: readonly string[]
  readonly notes: readonly string[]
  readonly ready: boolean
  readonly debt?: DebtRow | undefined
}
