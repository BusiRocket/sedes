import type { Receipt } from '../types/Receipt'

/**
 * The note `sedes oargt recibos` carries about today's amounts: how to ask
 * for them when they were not requested, and which enforced receipts came
 * back without one when they were.
 */
export const amountTodayNotes = (
  requested: boolean,
  enforced: readonly Receipt[],
): readonly string[] => {
  if (!requested)
    return [
      "today's amount with surcharges and interest is not listed; pass --importes to fetch it per enforced receipt",
    ]
  const missing = enforced.filter(
    (receipt) => receipt.amountToday === undefined,
  )
  if (missing.length === 0) return []
  return [
    `the portal answered no amount today for ${missing.map((receipt) => receipt.reference).join(', ')}; the listed pending amount is shown instead`,
  ]
}
