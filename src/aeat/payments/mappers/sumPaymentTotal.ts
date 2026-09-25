import type { AeatPayment } from '../types/AeatPayment'

/** Sum of every payment in euros; the portal counts in cents, so does this. */
export const sumPaymentTotal = (payments: readonly AeatPayment[]): number => {
  const cents = payments.reduce(
    (total, payment) => total + Math.round(payment.importe.amount * 100),
    0,
  )
  return cents / 100
}
