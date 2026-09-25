import type { HttpClient } from '../../http/types/HttpClient'
import { fetchProsaAction } from '../prosa/fetchers/fetchProsaAction'
import { fetchReportPdf } from '../prosa/fetchers/fetchReportPdf'
import { readXmlField } from '../prosa/parsers/readXmlField'
import { readXmlMessages } from '../prosa/parsers/readXmlMessages'
import { writeProsaPdf } from '../prosa/writeProsaPdf'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { parseHolderName } from './parsers/parseHolderName'
import type { AffiliationReportRequest } from './types/AffiliationReportRequest'
import type { AffiliationReportResult } from './types/AffiliationReportResult'

/**
 * Emit one Informes de Afiliación report for the certificate holder and
 * download its PDF: log into the INAF service, press the generating button
 * when the screen has one, and fetch the report the answer announces.
 */
export const emitAffiliationReport = async (
  client: HttpClient,
  request: AffiliationReportRequest,
  outDir: string | undefined,
): Promise<AffiliationReportResult> => {
  const session = await loginWithCertificate(client, request.app)
  const holder = parseHolderName(session.xml)
  const nif = readXmlField(session.xml, 'IP3_solicitante')
  const naf = readXmlField(session.xml, 'NAF_Ciudadano')
  const xml =
    request.action === undefined
      ? session.xml
      : (
          await fetchProsaAction(
            client,
            session,
            request.action,
            request.fields,
          )
        ).xml
  const messages = readXmlMessages(xml)
  const { document, pdf } = await fetchReportPdf(client, session.sessionId, xml)
  const pdfPath = outDir
    ? await writeProsaPdf(outDir, request.kind, naf ?? nif ?? 'holder', pdf)
    : undefined
  return {
    holder,
    nif,
    naf,
    messages,
    secuencial: document.secuencial,
    pdfPath,
    bytes: pdf.length,
    notes: request.notes,
  }
}
