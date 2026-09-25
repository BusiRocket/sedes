import { parseFirstForm } from '../../html/parsers/parseFirstForm'
import { postForm } from '../../http/postForm'
import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { tgssUrls } from './tgssUrls'

/**
 * The Cl@ve/IPCE relay as the portal plays it: every page is an auto-submit
 * SAML form to post, except the IdP chooser, which has no form and is answered
 * by an empty POST to the certificate option (the certificate itself travels
 * by mTLS on the next hop). The walk ends on the first `OnlineAccess` page
 * after the chooser, which is the Prosa landing.
 */
export const walkSamlChain = async (
  client: HttpClient,
  entry: HttpResponse,
): Promise<HttpResponse> => {
  const maxHops = 12
  const minHopForLanding = 2
  let response = entry
  for (let hop = 0; hop < maxHops; hop += 1) {
    const form = parseFirstForm(response.text, response.url)
    if (!form || Object.keys(form.fields).length === 0) {
      const isChooser =
        response.text.includes('seleccion=') || response.text.includes('IPCE')
      if (!isChooser) return response
      response = await client.request(tgssUrls.certificateSelection, {
        method: 'POST',
        body: '',
        referer: response.url,
      })
      continue
    }
    response = await postForm(client, form, {}, { referer: response.url })
    if (response.url.includes('OnlineAccess') && hop > minHopForLanding)
      return response
  }
  return response
}
