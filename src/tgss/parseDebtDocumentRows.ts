import type { DebtDocument } from './DebtDocument'
import { debtPeriodoLabel } from './debtPeriodoLabel'
import { parseEuroAmount } from './parseEuroAmount'

/** Every debt document row in an "informe de deuda exigible" text extraction, one line per document. */
export const parseDebtDocumentRows = (
  text: string,
): readonly DebtDocument[] => {
  const row =
    /^\s*(\d{12} \d{4})\s+(\d{2}\/\d{2}\/\d{2} \d+)\s+(\d{2}\/\d{4})\s+(\d{2}\/\d{4})\s+([\d.]+,\d{2})\s*$/
  const toDocument = (match: RegExpExecArray): DebtDocument | undefined => {
    const identificador = match[1]
    const numeroDocumento = match[2]
    const periodoDesde = match[3]
    const periodoHasta = match[4]
    const importe = match[5]
    if (
      !identificador ||
      !numeroDocumento ||
      !periodoDesde ||
      !periodoHasta ||
      !importe
    )
      return undefined
    return {
      identificador,
      numeroDocumento,
      periodo: debtPeriodoLabel(periodoDesde, periodoHasta),
      importe,
      importeEuros: parseEuroAmount(importe),
    }
  }
  return text
    .split('\n')
    .map((line) => row.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map(toDocument)
    .filter((document): document is DebtDocument => document !== undefined)
}
