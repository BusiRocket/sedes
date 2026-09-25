import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { fetchInformativesPage } from './fetchers/fetchInformativesPage'
import { parseInformativeRows } from './parsers/parseInformativeRows'
import { readInformative } from './readInformative'
import type { InformativeFiling } from './types/InformativeFiling'
import type { InformativesQuery } from './types/InformativesQuery'
import type { InformativesReport } from './types/InformativesReport'

/**
 * The informativas (190, 347, 349, 184, 720...) filed for one modelo and
 * ejercicio through SCGI-DTRA, which SCEJ never lists. The application only
 * covers ejercicio 2020 onwards.
 */
export const listAeatInformatives = async (
  client: HttpClient,
  nif: string,
  query: InformativesQuery,
  outDir: string | undefined,
): Promise<InformativesReport> => {
  const notes = [
    'SCGI-DTRA covers ejercicio 2020 onwards; earlier years cannot be queried here',
    'autoliquidaciones are not listed here; see aeat declaraciones',
  ]
  await openAeatSession(client)
  const rows = parseInformativeRows(
    await fetchInformativesPage(client, nif, query),
  )
  const filings: InformativeFiling[] = []
  for (const filing of rows)
    filings.push(await readInformative({ client, nif, query, filing, outDir }))
  return { nif, query, filings, count: filings.length, notes }
}
