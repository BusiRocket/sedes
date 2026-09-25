import type { HttpClient } from '../../../http/types/HttpClient'
import { parseReceiptRows } from '../parsers/parseReceiptRows'
import { readRowKeys } from '../parsers/readRowKeys'
import type { Receipt } from '../types/Receipt'
import { fetchAmountToday } from './fetchAmountToday'
import { fetchTab } from './fetchTab'

/**
 * The ejecutiva tab as typed receipts, each carrying today's amount when
 * asked for it. The portal computes surcharges and interest per receipt, so
 * that is one `CALCULAR_IMP` post per row, made in order.
 */
export const fetchEnforcedReceipts = async (
  client: HttpClient,
  refererUrl: string,
  includeAmountToday: boolean,
): Promise<readonly Receipt[]> => {
  const rows = await fetchTab(client, refererUrl, 'ejecutiva')
  const receipts = parseReceiptRows(rows, 'ejecutiva')
  if (!includeAmountToday) return receipts
  const keys = readRowKeys(rows)
  const withAmounts: Receipt[] = []
  for (const [index, receipt] of receipts.entries()) {
    const key = keys[index] ?? ''
    const amountToday =
      key === '' ? undefined : await fetchAmountToday(client, refererUrl, key)
    withAmounts.push({ ...receipt, amountToday })
  }
  return withAmounts
}
