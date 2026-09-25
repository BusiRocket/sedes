import { parseFirstForm } from '../../html/parsers/parseFirstForm'
import type { HtmlForm } from '../../html/types/HtmlForm'
import type { HttpClient } from '../../http/types/HttpClient'
import { dehuUrls } from '../api/dehuUrls'
import { parseJsonResponse } from '../api/parseJsonResponse'

/** Fetch the JSON-wrapped Cl@ve login form DEHU hands out to start the certificate relay. */
export const fetchClaveLoginForm = async (
  client: HttpClient,
): Promise<HtmlForm> => {
  const response = await client.request(dehuUrls.loginClaveForm, {
    referer: dehuUrls.publicPage,
  })
  const html = parseJsonResponse(response, 'login-clave-form')
  if (typeof html !== 'string')
    throw new Error('DEHU: login-clave-form did not return a JSON string')
  const form = parseFirstForm(html, dehuUrls.base)
  if (!form)
    throw new Error('DEHU: no login form in the login-clave-form response')
  return form
}
