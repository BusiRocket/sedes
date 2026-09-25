import { htmlToText } from '../../html/htmlToText'

/** The holder's name from the 'Datos del contribuyente' block, when the page shows one. */
export const parseEntityName = (html: string): string | undefined => {
  const match = /Nombre:(.+?)(?:Avisos\b|Clave de liquidaci|$)/.exec(
    htmlToText(html),
  )
  return match?.[1]?.trim()
}
