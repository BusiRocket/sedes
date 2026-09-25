import { htmlToText } from '../../../html/htmlToText'

/** The page's own explanation when 'Relación de deudas' has no rows, kept verbatim. */
export const parseNoDebtsHint = (html: string): string | undefined => {
  const match = /Avisos(.+?)(?:Agencia Tributaria|$)/.exec(htmlToText(html))
  return match?.[1]?.trim()
}
