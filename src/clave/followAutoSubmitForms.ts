import { parseFirstForm } from '../html/parseFirstForm'
import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { postForm } from '../http/postForm'

/**
 * Walk a SAML relay: while the page is an auto-submitting form (all fields
 * hidden, as Cl@ve's pasarela and the IdPs emit), post it and continue. Stops
 * on the first page without a form, or when `landed` says the relay is over.
 */
export const followAutoSubmitForms = async (
  client: HttpClient,
  start: HttpResponse,
  landed: (response: HttpResponse, hop: number) => boolean = () => false,
): Promise<HttpResponse> => {
  const maxHops = 12
  let response = start
  for (let hop = 0; hop < maxHops; hop += 1) {
    if (landed(response, hop)) return response
    const form = parseFirstForm(response.text, response.url)
    if (!form || Object.keys(form.fields).length === 0) return response
    response = await postForm(client, form, {}, { referer: response.url })
  }
  return response
}
