import type { HttpClient } from '../../http/types/HttpClient'
import { listPendingNotifications } from '../appearance/listPendingNotifications'
import { fetchDebtList } from '../debts/fetchers/fetchDebtList'
import { parseDebtRows } from '../debts/parsers/parseDebtRows'
import { parsePuvToken } from './parsers/parsePuvToken'
import type { PaymentLetterContext } from './types/PaymentLetterContext'

/** The read-only part of the chain: the debt list and the unread notifications that would block it. */
export const readLetterContext = async (
  client: HttpClient,
  nif: string,
  today: Date,
): Promise<PaymentLetterContext> => {
  const listHtml = await fetchDebtList(client, nif)
  const pending = await listPendingNotifications(client, today)
  return {
    debts: parseDebtRows(listHtml),
    pendingNotifications: pending.length,
    puv: parsePuvToken(listHtml),
  }
}
