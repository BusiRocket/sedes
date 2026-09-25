import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { fetchSearchPage } from './fetchers/fetchSearchPage'
import { postZkEvent } from './fetchers/postZkEvent'
import { zkClickData } from './mappers/zkClickData'
import { parseResultRows } from './parsers/parseResultRows'
import { parseZkDesktop } from './parsers/parseZkDesktop'
import { readFiling } from './readFiling'
import { selectSearchCriteria } from './selectors/selectSearchCriteria'
import type { AeatFiling } from './types/AeatFiling'
import type { AeatFilingsReport } from './types/AeatFilingsReport'
import type { FilingsQuery } from './types/FilingsQuery'

/**
 * List the declarations the certificate holder filed for one modelo and
 * ejercicio through SCEJ-MANT ("Consulta de declaraciones presentadas"),
 * with the CSV of each receipt and, with `outDir`, the receipt PDFs.
 */
export const listAeatFilings = async (
  client: HttpClient,
  nif: string,
  query: FilingsQuery,
  outDir?: string,
): Promise<AeatFilingsReport> => {
  await openAeatSession(client)
  const html = await fetchSearchPage(client)
  const desktop = parseZkDesktop(html)
  await selectSearchCriteria(client, html, desktop, query)
  const gridResponse = await postZkEvent(client, desktop.desktopId, {
    cmd: 'onClick',
    uuid: desktop.buttonBuscar,
    data: zkClickData,
  })
  const rows = parseResultRows(gridResponse)
  const filings: AeatFiling[] = []
  for (const [index, expediente] of rows.expedientes.entries()) {
    const verUuid = rows.verButtons[index]
    if (verUuid === undefined) {
      filings.push({ expediente })
      continue
    }
    filings.push(
      await readFiling(client, {
        desktopId: desktop.desktopId,
        expediente,
        verUuid,
        query,
        outDir,
      }),
    )
  }
  return {
    nif,
    query,
    filings,
    count: filings.length,
    notes: [
      'SCEJ-MANT lists autoliquidaciones only; informativas (190, 347, 349, 184, 720...) never appear',
      'without --periodo the search returns every period of the ejercicio',
    ],
  }
}
