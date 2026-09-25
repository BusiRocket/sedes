import { unescapeHtml } from '../../../html/unescapeHtml'

/** The holder's name from the "user-name" span of the sede's personal area header. */
export const parseHolderName = (html: string): string | undefined => {
  const name = /<span\s+id="user-name"[^>]*>([^<]+)<\/span>/.exec(html)?.[1]
  return name ? unescapeHtml(name).trim() : undefined
}
