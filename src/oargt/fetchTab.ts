import type { HttpClient } from '../http/HttpClient'
import { extractReceiptJson } from './extractReceiptJson'
import { oargtUrls } from './oargtUrls'
import type { ReceiptTab } from './ReceiptTab'
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
