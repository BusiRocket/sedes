import { htmlToText } from '../html/htmlToText'
import type { AgreementDetail } from './AgreementDetail'
import { parseTableRowCells } from './parseTableRowCells'
import { toMoneyAmount } from './toMoneyAmount'

/**
 * Fields read from one AcuAccDeta page. Notes only pin down a handful of
 * labels, so every liquidation key mentioned is collected separately and the
 * plazos table is kept as generic cells alongside the named fields.
 */
export const parseAgreementDetail = (html: string): AgreementDetail => {
  const text = htmlToText(html)
  const isDefined = (value: string | undefined): value is string =>
    value !== undefined
  const importeText =
    /Importe acuerdo[\s:]*(-?\d{1,3}(?:\.\d{3})*,\d{2})/i.exec(text)?.[1]
  const deudas = [
    ...new Set(
      [...text.matchAll(/\b(A\d{16}[A-Z0-9]?|Z\d{18,20})\b/g)].map(
        (match) => match[1],
      ),
    ),
  ].filter(isDefined)
  return {
    estado: /Acuerdo[\s:]*\w+\s*\(([^)]+)\)/i.exec(text)?.[1],
    resolucion: /Tipo resoluci[^\s:]+[\s:]*(Concesi\S+|Denegaci\S+)/i.exec(
      text,
    )?.[1],
    importe: importeText ? toMoneyAmount(importeText) : undefined,
    notificado: /Fecha notificaci[^\s:]+[\s:]*(\d{2}-\d{2}-\d{4})/i.exec(
      text,
    )?.[1],
    plazos: /N\S+mero de? plazos[\s:]*(\d+)/i.exec(text)?.[1],
    primerPlazo: /Fecha primer plazo[\s:]*(\d{2}-\d{2}-\d{4})/i.exec(text)?.[1],
    deudas,
    instalments: parseTableRowCells(html).filter((cells) =>
      cells.some((cell) => cell !== ''),
    ),
  }
}
