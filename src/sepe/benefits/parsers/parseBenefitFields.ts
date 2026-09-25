import { readAttribute } from '../../../html/readAttribute'
import { unescapeHtml } from '../../../html/unescapeHtml'
import { benefitFieldNames } from '../benefitFieldNames'

/** The benefit inputs present on the page, by name, with their values unescaped and trimmed. */
export const parseBenefitFields = (
  html: string,
): Readonly<Record<string, string>> => {
  const fields: Record<string, string> = {}
  for (const [tag] of html.matchAll(/<input\b[^>]*>/gi)) {
    const name = readAttribute(tag, 'name')
    if (name === undefined || !benefitFieldNames.includes(name)) continue
    fields[name] = unescapeHtml(readAttribute(tag, 'value') ?? '').trim()
  }
  return fields
}
