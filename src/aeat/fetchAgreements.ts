import type { HttpClient } from '../http/HttpClient'
import { aeatBaseUrl } from './aeatBaseUrl'
import type { Agreement } from './Agreement'
import { parseAgreementDetail } from './parseAgreementDetail'
import { parseAgreementList } from './parseAgreementList'

/** Every SRAF deferral/instalment agreement on the certificate's NIF, read-only. */
export const fetchAgreements = async (
  client: HttpClient,
): Promise<readonly Agreement[]> => {
  const listingResponse = await client.request(
    `${aeatBaseUrl}/wlpl/inwinvoc/es.aeat.dit.adu.sraf.solicitud.SolAccionW?fAccion=petic&fFigura=obli`,
  )
  const listings = parseAgreementList(listingResponse.text, aeatBaseUrl)
  const agreements: Agreement[] = []
  for (const listing of listings) {
    const detailResponse = await client.request(listing.detailUrl)
    agreements.push({
      acuerdo: listing.acuerdo,
      ...parseAgreementDetail(detailResponse.text),
    })
  }
  return agreements
}
