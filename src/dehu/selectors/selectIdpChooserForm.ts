import type { HtmlForm } from '../../html/HtmlForm'
import { parseForms } from '../../html/parseForms'
import { findMatchingForm } from '../findMatchingForm'

/**
 * The Cl@ve identity-provider chooser form, picked by its `idpRedirect`
 * name or id, as the page's own "DNIe / Certificado electronico" link does
 * with an onclick, not by document order (the page's first form is a
 * language switcher).
 */
export const selectIdpChooserForm = (
  html: string,
  baseUrl: string,
): HtmlForm | undefined => {
  const idpChooserPattern = /(?:name|id)="idpRedirect"/i
  const block = findMatchingForm(html, (form) => idpChooserPattern.test(form))
  return block ? parseForms(block, baseUrl)[0] : undefined
}
