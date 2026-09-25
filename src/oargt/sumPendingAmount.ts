import type { Receipt } from './Receipt'

/** The sum of a set of receipts' pending amount, in euros. */
export const sumPendingAmount = (receipts: readonly Receipt[]): number =>
  receipts.reduce((total, receipt) => total + receipt.pendingNumber, 0)
