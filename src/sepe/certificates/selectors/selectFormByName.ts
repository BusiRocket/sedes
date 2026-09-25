import { findMatchingForm } from '../../../dehu/session/findMatchingForm'
import { parseForms } from '../../../html/parsers/parseForms'
import { readAttribute } from '../../../html/readAttribute'
import type { HtmlForm } from '../../../html/types/HtmlForm'

/** The form whose own `name` or `id` attribute is exactly `name`, parsed, or undefined. */
export const selectFormByName = (
  html: string,
  name: string,
  baseUrl: string,
): HtmlForm | undefined => {
  const block = findMatchingForm(html, (form) => {
    const openTag = /<form\b[^>]*>/i.exec(form)?.[0] ?? ''
    return (
      readAttribute(openTag, 'name') === name ||
      readAttribute(openTag, 'id') === name
    )
  })
  return block ? parseForms(block, baseUrl)[0] : undefined
}
