import { htmlToText } from '../../../html/htmlToText'

/**
 * The `#contenido` (or `#contenido2`) block of a sede page as plain text, up
 * to the footer, so a screen that states a message instead of a right can be
 * quoted without its cookie banner and chrome.
 */
export const parseMainText = (html: string): string => {
  const main =
    /<div[^>]*id="contenido2?"[^>]*>([\s\S]*?)<div[^>]*id="pie/i.exec(html)
  return htmlToText(main?.[1] ?? html)
}
