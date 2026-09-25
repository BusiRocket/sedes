import type { HttpClient } from '../../http/types/HttpClient'
import { fetchRequestsList } from '../fetchers/fetchRequestsList'
import { riskRequestFromRecord } from '../mappers/riskRequestFromRecord'
import { readDatoRecords } from '../parsers/readDatoRecords'
import type { RiskRequest } from '../types/RiskRequest'

/** The holder's report requests, newest first as the portal lists them. */
export const listRiskRequests = async (
  client: HttpClient,
): Promise<RiskRequest[]> => {
  const list = await fetchRequestsList(client)
  return readDatoRecords(list.xml, 'RegistrosSolicitudesRiesgos').map(
    riskRequestFromRecord,
  )
}
