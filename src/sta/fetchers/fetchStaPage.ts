import type { HttpClient } from '../../http/types/HttpClient'
import { extractStaDatasets } from '../parsers/extractStaDatasets'
import { staPageUrl } from '../session/staPageUrl'
import type { StaDatasets } from '../types/StaDatasets'

/** Open a private STA page and return the datasets it embeds (its default tab). */
export const fetchStaPage = async (
  client: HttpClient,
  origin: string,
  pageCode: string,
): Promise<StaDatasets> => {
  const response = await client.request(staPageUrl(origin, pageCode))
  if (!response.text.includes('CarpetaPrivate/Logout'))
    throw new Error(`${new URL(origin).hostname}: session lost on ${pageCode}`)
  return extractStaDatasets(response.text)
}
