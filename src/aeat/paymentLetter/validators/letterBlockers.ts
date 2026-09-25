import type { DebtRow } from '../../debts/types/DebtRow'
import { euroTextToCents } from '../mappers/euroTextToCents'
import type { PaymentLetterContext } from '../types/PaymentLetterContext'
import type { PaymentLetterRequest } from '../types/PaymentLetterRequest'
import { isEuroAmountText } from './isEuroAmountText'

/** Every reason the confirmed run would stop; empty means it may proceed. */
export const letterBlockers = (
  context: PaymentLetterContext,
  request: PaymentLetterRequest,
  debt: DebtRow | undefined,
): readonly string[] => {
  const blockers: string[] = []
  if (context.pendingNotifications > 0)
    blockers.push(
      `${String(context.pendingNotifications)} unread AEAT notification(s) block the payment chain; appear first (papeleo aeat comparecer).`,
    )
  if (!debt) {
    blockers.push(`Liquidación ${request.clave} is not in the debt list.`)
    return blockers
  }
  if (!context.puv)
    blockers.push('The debt list page carried no pUV token for the next step.')
  if (!isEuroAmountText(request.importe)) {
    blockers.push(`--importe ${request.importe} is not an n,nn amount.`)
    return blockers
  }
  const cents = euroTextToCents(request.importe)
  if (cents <= 0 || cents > euroTextToCents(debt.pendiente.text))
    blockers.push(
      `--importe ${request.importe} must be above 0 and at most the pending ${debt.pendiente.text}.`,
    )
  return blockers
}
