import type { HttpClient } from '../../http/types/HttpClient'
import { detectContactPrompt } from '../session/detectContactPrompt'
import { openOargtSession } from '../session/openOargtSession'
import { fetchTab } from './fetchers/fetchTab'
import { sumPendingAmount } from './mappers/sumPendingAmount'
import { extractReceiptJson } from './parsers/extractReceiptJson'
import { parseReceiptRows } from './parsers/parseReceiptRows'
import type { OargtReceiptsResult } from './types/OargtReceiptsResult'

/**
 * Log in with the client certificate and list the voluntaria and ejecutiva
 * receipts, and the pagados ones when asked. Stops without touching any tab
 * when the office demands a contact-data confirmation first, since answering
 * that is a write.
 */
export const listOargtReceipts = async (
  client: HttpClient,
  options: { readonly includePaid: boolean },
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
  const voluntaria = parseReceiptRows(
    extractReceiptJson(session.text),
    'voluntaria',
  )
  const ejecutiva = parseReceiptRows(
    await fetchTab(client, session.url, 'ejecutiva'),
    'ejecutiva',
  )
  const pagados = options.includePaid
    ? parseReceiptRows(
        await fetchTab(client, session.url, 'pagados'),
        'pagados',
      )
    : []
  return {
    contactConfirmationPending: false,
    receipts: [...voluntaria, ...ejecutiva, ...pagados],
    totals: {
      voluntaria: sumPendingAmount(voluntaria),
      ejecutiva: sumPendingAmount(ejecutiva),
    },
    amountTodayAvailable: false,
    notes: [
      "today's amount with surcharges and interest comes from the calcularImp tooltip; its request has not been derived, so only the listed pending amount is shown",
    ],
  }
}
