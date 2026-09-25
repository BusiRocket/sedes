import type { HtmlForm } from '../../html/HtmlForm'
import { parseForms } from '../../html/parseForms'
import { findMatchingForm } from '../findMatchingForm'

/**
 * The SAML relay form on a Cl@ve/DEHU hop, picked by having an absolute
 * action and a `SAMLRequest`/`SAMLResponse` field. Every relay page carries
 * several forms, and the first one is often a language switcher or an
 * empty-action decoy.
 */
export const selectSamlRelayForm = (
  html: string,
  baseUrl: string,
): HtmlForm | undefined => {
  const hasAbsoluteAction = /\baction="https?:[^"]+"/i
  const hasSamlField = /name="SAML(?:Request|Response)"/i
  const block = findMatchingForm(
    html,
    (form) => hasAbsoluteAction.test(form) && hasSamlField.test(form),
  )
  return block ? parseForms(block, baseUrl)[0] : undefined
}
