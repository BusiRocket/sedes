import type { WriteResult } from '../../../write/types/WriteResult'
import type { DebtRow } from '../../debts/types/DebtRow'
import type { PaymentLetterReceipt } from './PaymentLetterReceipt'

/** The carta-pago answer: the write result plus the debt it was planned against. */
export type PaymentLetterPlan = WriteResult<PaymentLetterReceipt> & {
  readonly debt?: DebtRow | undefined
}
