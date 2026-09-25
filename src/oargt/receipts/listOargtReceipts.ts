import type { HttpClient } from '../../http/types/HttpClient'
import { detectContactPrompt } from '../session/detectContactPrompt'
import { openOargtSession } from '../session/openOargtSession'
import { fetchEnforcedReceipts } from './fetchers/fetchEnforcedReceipts'
import { fetchTab } from './fetchers/fetchTab'
import { amountTodayNotes } from './mappers/amountTodayNotes'
import { sumPendingAmount } from './mappers/sumPendingAmount'
import { extractReceiptJson } from './parsers/extractReceiptJson'
import { parseReceiptRows } from './parsers/parseReceiptRows'
import type { ListOargtReceiptsOptions } from './types/ListOargtReceiptsOptions'
import type { OargtReceiptsResult } from './types/OargtReceiptsResult'

/**
 * Log in with the client certificate and list the voluntaria and ejecutiva
 * receipts, the pagados ones when asked, and today's amount per enforced
 * receipt when asked. Stops without touching any tab when the office demands
 * a contact-data confirmation first, since answering that is a write.
 */
export const listOargtReceipts = async (
  client: HttpClient,
  options: ListOargtReceiptsOptions,
): Promise<OargtReceiptsResult> => {
  const session = await openOargtSession(client)
  if (detectContactPrompt(session.text))
    return {
      contactConfirmationPending: true,
      receipts: [],
      totals: { voluntaria: 0, ejecutiva: 0 },
      amountTodayAvailable: false,
      notes: [
        'the office asked to confirm contact data before showing receipts; this is a write and was left for the holder',
      ],
    }
  const includeAmountToday = options.includeAmountToday === true
  const voluntaria = parseReceiptRows(
    extractReceiptJson(session.text),
    'voluntaria',
  )
  const ejecutiva = await fetchEnforcedReceipts(
    client,
    session.url,
    includeAmountToday,
  )
  const pagados = options.includePaid
    ? parseReceiptRows(
        await fetchTab(client, session.url, 'pagados'),
        'pagados',
      )
    : []
  const notes = amountTodayNotes(includeAmountToday, ejecutiva)
  return {
    contactConfirmationPending: false,
    receipts: [...voluntaria, ...ejecutiva, ...pagados],
    totals: {
      voluntaria: sumPendingAmount(voluntaria),
      ejecutiva: sumPendingAmount(ejecutiva),
    },
    amountTodayAvailable: includeAmountToday && notes.length === 0,
    notes,
  }
}
