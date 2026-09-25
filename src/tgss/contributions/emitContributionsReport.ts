import type { HttpClient } from '../../http/types/HttpClient'
import { fetchProsaAction } from '../prosa/fetchers/fetchProsaAction'
import { fetchReportPdf } from '../prosa/fetchers/fetchReportPdf'
import { readXmlMessages } from '../prosa/parsers/readXmlMessages'
import { writeProsaPdf } from '../prosa/writeProsaPdf'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { fetchContributionsPages } from './fetchers/fetchContributionsPages'
import { parseContributionsHolder } from './parsers/parseContributionsHolder'
import type { ContributionsQuery } from './types/ContributionsQuery'
import type { ContributionsReportResult } from './types/ContributionsReportResult'
import { assertOfferedYear } from './validators/assertOfferedYear'

/**
 * Emit the "informe de bases y cuotas ingresadas" (service AESRCUS3) for one
 * year and download its PDF. The year screen already lists every régimen's
 * monthly bases, which the result carries as `regimenes`; the informe itself
 * is the `AC_IMPRIMIR_INFORME_BASES_Y_CUOTAS` button.
 */
export const emitContributionsReport = async (
  client: HttpClient,
  query: ContributionsQuery,
  outDir: string | undefined,
): Promise<ContributionsReportResult> => {
  const { ejercicio } = query
  const session = await loginWithCertificate(client, 'AESRCUS3')
  assertOfferedYear(session.xml, ejercicio)
  const { holder, nif, naf } = parseContributionsHolder(session.xml)
  const walked = await fetchContributionsPages(client, session, ejercicio)
  const print = 'AC_IMPRIMIR_INFORME_BASES_Y_CUOTAS'
  const printed = await fetchProsaAction(client, walked.session, print, {
    anioSel: ejercicio,
  })
  const messages = readXmlMessages(printed.xml)
  const report = await fetchReportPdf(client, session.sessionId, printed.xml)
  const label = naf ?? nif ?? 'holder'
  const pdfPath = outDir
    ? await writeProsaPdf(outDir, `bases-${ejercicio}`, label, report.pdf)
    : undefined
  return {
    holder,
    nif,
    naf,
    ejercicio,
    regimenes: walked.pages,
    messages,
    secuencial: report.document.secuencial,
    pdfPath,
    bytes: report.pdf.length,
    notes: [
      'amounts are the bases and cuotas the TGSS records as paid for the year; the informe is emitted on request',
    ],
  }
}
