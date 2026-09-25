import type { HttpClient } from '../../http/types/HttpClient'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { downloadReportPdf } from './downloadReportPdf'
import { emitDebtReport } from './emitDebtReport'
import { parseDebtDocumentRows } from './parsers/parseDebtDocumentRows'
import { parseDebtReportText } from './parsers/parseDebtReportText'
import type { TgssDebtResult } from './types/TgssDebtResult'
import { writeReportPdf } from './writeReportPdf'

/**
 * Log in with the caller's certificate, emit the "informe de deuda exigible"
 * for the holder, and download its PDF when there is one. `outDir` is
 * undefined when the caller passed no `--out`: the PDF is then not written,
 * but the parsed result is still reported.
 */
export const readTgssDebt = async (
  client: HttpClient,
  nif: string,
  outDir: string | undefined,
): Promise<TgssDebtResult> => {
  const notes = ['one emission per subject and day']
  const session = await loginWithCertificate(client)
  const outcome = await emitDebtReport(client, session)
  if (!outcome.hasDebt)
    return { nif, hasDebt: false, message: outcome.message, notes }
  const report =
    parseDebtDocumentRows(outcome.xml).length > 0
      ? parseDebtReportText(outcome.xml)
      : undefined
  const pdf = await downloadReportPdf(client, session.sessionId)
  const pdfPath = outDir ? await writeReportPdf(outDir, nif, pdf) : undefined
  return { nif, hasDebt: true, pdfPath, report, notes }
}
