import type { HtmlForm } from '../../../html/types/HtmlForm'
import type { SamlHop } from '../types/SamlHop'

/**
 * Where a relay form really goes. The ServiceRedirect screen names the next
 * hop in an `idpUrl` field that its JavaScript copies over the action, so the
 * field wins when present and is not posted along; otherwise the form's own
 * action, which `parseForms` has already made absolute (an empty action is the
 * current page).
 */
export const mapSamlHop = (form: HtmlForm, currentUrl: string): SamlHop => {
  const { idpUrl, ...fields } = form.fields
  if (idpUrl === undefined || idpUrl === '')
    return { url: form.action, fields: form.fields }
  return { url: new URL(idpUrl, currentUrl).href, fields }
}
