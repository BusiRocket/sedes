import type { HttpClient } from '../../http/types/HttpClient'
import { fetchFilingCsv } from './fetchers/fetchFilingCsv'
import { fetchFilingPdf } from './fetchers/fetchFilingPdf'
import type { AeatFiling } from './types/AeatFiling'
import type { ReadFilingParams } from './types/ReadFilingParams'
import { writeFilingPdf } from './writeFilingPdf'

/**
 * Resolve one result row: the CSV always (it identifies the receipt), the
 * PDF only when an output directory was given.
 */
export const readFiling = async (
  client: HttpClient,
  params: ReadFilingParams,
): Promise<AeatFiling> => {
  const { desktopId, expediente, verUuid, query, outDir } = params
  const csv = await fetchFilingCsv(client, desktopId, verUuid)
  if (csv === undefined || outDir === undefined) return { expediente, csv }
  const pdf = await fetchFilingPdf(client, csv)
  const pdfPath = await writeFilingPdf(outDir, query, expediente, pdf)
  return { expediente, csv, pdfPath }
}
