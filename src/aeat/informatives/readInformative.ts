import { fetchFilingPdf } from '../filings/fetchers/fetchFilingPdf'
import { parseCsvCode } from '../filings/parsers/parseCsvCode'
import { fetchInformativeDetail } from './fetchers/fetchInformativeDetail'
import type { InformativeFiling } from './types/InformativeFiling'
import type { ReadInformativeParams } from './types/ReadInformativeParams'
import { writeInformativePdf } from './writeInformativePdf'

/** Resolve one filing's CSV from its detail page and, with outDir, its PDF. */
export const readInformative = async ({
  client,
  nif,
  query,
  filing,
  outDir,
}: ReadInformativeParams): Promise<InformativeFiling> => {
  const csv = parseCsvCode(
    await fetchInformativeDetail(client, nif, filing.expediente),
  )
  if (csv === undefined || outDir === undefined) return { ...filing, csv }
  const pdf = await fetchFilingPdf(client, csv)
  const pdfPath = await writeInformativePdf(
    outDir,
    query,
    filing.expediente,
    pdf,
  )
  return { ...filing, csv, pdfPath }
}
