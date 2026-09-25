import type { HttpClient } from '../../http/types/HttpClient'
import { downloadResolvedReports } from '../download/downloadResolvedReports'
import { openCirbeSession } from '../session/openCirbeSession'
import type { CirbeStatusResult } from '../types/CirbeStatusResult'
import { listRiskRequests } from './listRiskRequests'

/** The holder's CIRBE report requests and, with `outDir`, the PDFs of the latest resolved one. */
export const readCirbeStatus = async (
  client: HttpClient,
  outDir?: string,
): Promise<CirbeStatusResult> => {
  await openCirbeSession(client)
  const requests = await listRiskRequests(client)
  const downloaded =
    outDir === undefined ? [] : await downloadResolvedReports(client, outDir)
  const notes: string[] = []
  if (outDir !== undefined && downloaded.length === 0)
    notes.push(
      'no resolved request to download; a new one resolves in 14 minutes to 2 hours',
    )
  if (requests.length === 0)
    notes.push('no report requests; `cirbe informe` registers one')
  return { requests, downloaded, notes }
}
