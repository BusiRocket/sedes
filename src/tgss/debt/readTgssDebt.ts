import type { HttpClient } from '../../http/types/HttpClient'
import { fetchProsaDocument } from '../prosa/fetchers/fetchProsaDocument'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { emitDebtReport } from './emitDebtReport'
import { debtReportFileName } from './mappers/debtReportFileName'
import { parseDebtDocumentRows } from './parsers/parseDebtDocumentRows'
import { parseDebtReportText } from './parsers/parseDebtReportText'
import type { DebtReportKind } from './types/DebtReportKind'
import type { TgssDebtResult } from './types/TgssDebtResult'
import { writeReportPdf } from './writeReportPdf'

/**
 * Log in with the caller's certificate, emit the "informe de deuda exigible"
 * for the holder (detailed by default, or the total-only report), and
 * download its PDF when there is one. `outDir` is undefined when the caller
 * passed no `--out`: the PDF is then not written, but the parsed result is
 * still reported.
 */
export const readTgssDebt = async (
  client: HttpClient,
  nif: string,
  outDir: string | undefined,
  kind: DebtReportKind = 'detallado',
): Promise<TgssDebtResult> => {
  const notes = ['one emission per subject and day']
  const session = await loginWithCertificate(client)
  const outcome = await emitDebtReport(client, session, kind)
  if (!outcome.hasDebt)
    return { nif, kind, hasDebt: false, message: outcome.message, notes }
  const report =
    parseDebtDocumentRows(outcome.xml).length > 0
      ? parseDebtReportText(outcome.xml)
      : undefined
  const pdf = await fetchProsaDocument(client, session.sessionId)
  const pdfPath = outDir
    ? await writeReportPdf(outDir, debtReportFileName(kind, nif), pdf)
    : undefined
  return { nif, kind, hasDebt: true, pdfPath, report, notes }
}
