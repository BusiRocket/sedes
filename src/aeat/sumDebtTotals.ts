import type { Debt } from './Debt'

/** Sum of pendiente, and of a ingresar where the portal gave one, across every debt. */
export const sumDebtTotals = (
  debts: readonly Debt[],
): { readonly pendiente: number; readonly aIngresar: number } => ({
  pendiente: debts.reduce((total, debt) => total + debt.pendiente.amount, 0),
  aIngresar: debts.reduce(
    (total, debt) => total + (debt.aIngresar?.amount ?? 0),
    0,
  ),
})
