import type { HttpClient } from '../../../http/types/HttpClient'
import { oargtUrls } from '../../session/oargtUrls'
import { extractReceiptJson } from '../parsers/extractReceiptJson'
import type { ReceiptTab } from '../types/ReceiptTab'
import { tabSelectionBody } from './tabSelectionBody'

/**
 * Ask the RECIBOS page's TABBER for the ejecutiva or pagados tab: the answer
 * is an XML `<zones>` document, and the rows sit in a `<script>` sibling of
 * the zones as the same `dataset_DEUDAPENDIENTE` JSON the initial page emits.
 */
export const fetchTab = async (
  client: HttpClient,
  refererUrl: string,
  tab: Exclude<ReceiptTab, 'voluntaria'>,
): Promise<readonly unknown[]> => {
  const response = await client.request(oargtUrls.submitAjax, {
    method: 'POST',
    form: tabSelectionBody(tab),
    referer: refererUrl,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
  return extractReceiptJson(response.text)
}
