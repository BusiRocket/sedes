import type { Debt } from './Debt'

/** Sum of pendiente, and of a ingresar where the portal gave one, across every debt. */
export const sumDebtTotals = (
  debts: readonly Debt[],
): { readonly pendiente: number; readonly aIngresar: number } => {
  // Summing floats leaves noise in the last digits; the portal counts in cents.
  const cents = (amount: number): number => Math.round(amount * 100)
  const pendiente = debts.reduce(
    (total, debt) => total + cents(debt.pendiente.amount),
    0,
  )
  const aIngresar = debts.reduce(
    (total, debt) => total + cents(debt.aIngresar?.amount ?? 0),
    0,
  )
  return { pendiente: pendiente / 100, aIngresar: aIngresar / 100 }
}
