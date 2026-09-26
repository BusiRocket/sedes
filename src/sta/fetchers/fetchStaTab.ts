import type { HttpClient } from '../../http/types/HttpClient'
import { extractStaDatasets } from '../parsers/extractStaDatasets'
import { staPageUrl } from '../session/staPageUrl'
import type { StaDatasets } from '../types/StaDatasets'
import type { StaTab } from '../types/StaTab'
import { staTabBody } from './staTabBody'

/**
 * Select one tab of an STA page: open the page, then post the TABSEL the
 * page's own radio sends. The answer is an XML `<zones>` document whose
 * scripts carry the tab's `ds_*` rows.
 */
export const fetchStaTab = async (
  client: HttpClient,
  origin: string,
  tab: StaTab,
): Promise<StaDatasets> => {
  const pageUrl = staPageUrl(origin, tab.pageCode)
  await client.request(pageUrl)
  const response = await client.request(
    `${origin}/sta/CarpetaPrivate/submitAjax.aa`,
    {
      method: 'POST',
      form: staTabBody(tab),
      referer: pageUrl,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    },
  )
  return extractStaDatasets(response.text)
}
