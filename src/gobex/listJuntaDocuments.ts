import type { HttpClient } from '../http/types/HttpClient'
import { searchGobexReport } from './fetchers/searchGobexReport'
import { gobexUrls } from './session/gobexUrls'
import { loginWithClave } from './session/loginWithClave'
import type { GobexRecord } from './types/GobexRecord'

/** The documents the holder filed through the Junta's registry, from "Mis documentos". */
export const listJuntaDocuments = async (
  client: HttpClient,
): Promise<{ readonly documents: readonly GobexRecord[] }> => {
  await loginWithClave(client)
  const { rows: documents } = await searchGobexReport(
    client,
    gobexUrls.documents,
  )
  return { documents }
}
