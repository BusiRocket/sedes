import { htmlToText } from '../../../html/htmlToText'

/** The 010 justificante printed under "Documento de ingreso" on FinalPago. */
export const parseLetterJustificante = (html: string): string | undefined => {
  const text = htmlToText(html)
  const start = text.search(/Documento de ingreso/i)
  if (start < 0) return undefined
  return /\b(\d{12}[A-Z])\b/.exec(text.slice(start))?.[1]
}
