import type { HttpClient } from '../../../http/types/HttpClient'
import { parseReportDocument } from '../parsers/parseReportDocument'
import { readXmlMessages } from '../parsers/readXmlMessages'
import type { ReportPdf } from '../types/ReportPdf'
import { fetchProsaDocument } from './fetchProsaDocument'

/**
 * Download the report the screen `xml` announces. Throws with the screen's
 * own messages when it announces none, so a refusal reads as the portal
 * wrote it.
 */
export const fetchReportPdf = async (
  client: HttpClient,
  sessionId: string,
  xml: string,
): Promise<ReportPdf> => {
  const document = parseReportDocument(xml)
  if (document === undefined) {
    const messages = readXmlMessages(xml).join(' | ') || 'no message'
    throw new Error(`TGSS: no informe in the response (${messages})`)
  }
  const pdf = await fetchProsaDocument(
    client,
    sessionId,
    document.secuencial,
    document.typeView,
  )
  return { document, pdf }
}
