import type { DebtReport } from './DebtReport'
import { parseDebtDocumentRows } from './parseDebtDocumentRows'
import { parseDebtReportReference } from './parseDebtReportReference'
import { parseDebtReportTotal } from './parseDebtReportTotal'

/**
 * Parse the plain text of an "informe de deuda exigible" (e.g. `pdftotext
 * -layout` output over the emitted PDF, or the plain text a Prosa screen
 * sometimes carries inline).
 */
export const parseDebtReportText = (text: string): DebtReport => {
  const total = parseDebtReportTotal(text)
  return {
    totalExigible: total?.totalExigible ?? '',
    totalExigibleEuros: total?.totalExigibleEuros ?? 0,
    documentos: parseDebtDocumentRows(text),
    referenciaVerificacion: parseDebtReportReference(text),
  }
}
