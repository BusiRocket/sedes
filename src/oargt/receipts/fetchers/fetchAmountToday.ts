import type { HttpClient } from '../../../http/types/HttpClient'
import { oargtUrls } from '../../session/oargtUrls'
import { parseAmountToday } from '../parsers/parseAmountToday'
import type { AmountToday } from '../types/AmountToday'
import { amountTodayBody } from './amountTodayBody'

/**
 * Replay the tooltip's `calcularImp` call for one receipt row: a
 * `submitAjax.aa` POST that answers JSON with the amounts as of today.
 * Undefined when the portal has no breakdown for that row.
 */
export const fetchAmountToday = async (
  client: HttpClient,
  refererUrl: string,
  rowKey: string,
): Promise<AmountToday | undefined> => {
  const response = await client.request(oargtUrls.submitAjax, {
    method: 'POST',
    form: amountTodayBody(rowKey),
    referer: refererUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json, text/javascript, */*; q=0.01',
    },
  })
  return parseAmountToday(response.text)
}
