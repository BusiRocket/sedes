import type { WriteResult } from '../../../write/types/WriteResult'
import type { AeatNotification } from './AeatNotification'
import type { AppearanceReceipt } from './AppearanceReceipt'

/** The comparecer answer: the write result plus the pending notifications read to plan it. */
export type AppearancePlan = WriteResult<AppearanceReceipt> & {
  readonly pending: readonly AeatNotification[]
}
