import type { DebtRow } from '../../debts/types/DebtRow'

/** What the read-only part of the chain learned: the debt, its pending cents and the page token. */
export type PaymentLetterContext = {
  readonly debts: readonly DebtRow[]
  /** Unread AEAT sede notifications; any of them blocks the payment chain. */
  readonly pendingNotifications: number
  /** The `pUV` token the debt list page sets for the next step. */
  readonly puv: string | undefined
}
