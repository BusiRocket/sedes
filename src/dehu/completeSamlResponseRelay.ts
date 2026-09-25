import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { postForm } from '../http/postForm'
import { selectSamlRelayForm } from './selectors/selectSamlRelayForm'

/**
 * Relay the SAMLResponse back through Cl@ve to DEHU's login-check, without
 * following its final redirect: that answer carries the session JWT in its
 * `Location` header, not in a page worth downloading.
 */
export const completeSamlResponseRelay = async (
  client: HttpClient,
  identityPage: HttpResponse,
): Promise<HttpResponse> => {
  const backForm = selectSamlRelayForm(identityPage.text, identityPage.url)
  if (!backForm)
    throw new Error('DEHU: no SAML relay form after certificate authentication')
  const responsePage = await postForm(
    client,
    backForm,
    {},
    {
      referer: identityPage.url,
    },
  )
  const toDehuForm = selectSamlRelayForm(responsePage.text, responsePage.url)
  if (!toDehuForm)
    throw new Error('DEHU: no SAML relay form after the response redirect')
  return postForm(
    client,
    toDehuForm,
    {},
    {
      referer: responsePage.url,
      followRedirects: false,
    },
  )
}
