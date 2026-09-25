import { findMatchingForm } from '../../../dehu/session/findMatchingForm'
import { parseForms } from '../../../html/parsers/parseForms'
import type { HtmlForm } from '../../../html/types/HtmlForm'

/**
 * The relay form on a Cl@ve/SEPE hop: the first form carrying a
 * `SAMLRequest`, `SAMLResponse` or `ClaveToken` field. A page without one is
 * the service itself.
 */
export const selectSamlHopForm = (
  html: string,
  baseUrl: string,
): HtmlForm | undefined => {
  const hasSamlField = /name="(?:SAMLRequest|SAMLResponse|ClaveToken)"/i
  const block = findMatchingForm(html, (form) => hasSamlField.test(form))
  return block ? parseForms(block, baseUrl)[0] : undefined
}
