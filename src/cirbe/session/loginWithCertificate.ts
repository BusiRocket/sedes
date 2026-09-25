import { selectIdpChooserForm } from '../../dehu/session/selectors/selectIdpChooserForm'
import { postForm } from '../../http/postForm'
import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { selectSamlHopForm } from '../../sepe/session/selectors/selectSamlHopForm'
import { walkSamlChain } from '../../sepe/session/walkSamlChain'
import { cirbeUrls } from './cirbeUrls'

/**
 * Log the holder into the CIRBE Oficina Virtual: the IAEC login answers a
 * SAML form for Cl@ve, posted under the Banco de España Origin; the IdP
 * chooser is answered with the certificate option (`AFIRMA`) under the Cl@ve
 * Origin; the relay ends on `/cir_www/iaec/2Initializer`, which sets the app
 * cookies. After this the session is cookie based.
 */
export const loginWithCertificate = async (
  client: HttpClient,
): Promise<HttpResponse> => {
  const init = await client.request(cirbeUrls.login)
  const entry = selectSamlHopForm(init.text, init.url)
  if (!entry)
    throw new Error(
      `CIRBE: no SAML entry form at ${init.url} (${String(init.status)})`,
    )
  const chooserPage = await postForm(
    client,
    entry,
    {},
    { referer: cirbeUrls.appReferer, headers: { Origin: cirbeUrls.origin } },
  )
  const chooser = selectIdpChooserForm(chooserPage.text, chooserPage.url)
  if (!chooser)
    throw new Error(
      `CIRBE: no IdP chooser at ${chooserPage.url} (${String(chooserPage.status)})`,
    )
  const relay = await postForm(
    client,
    chooser,
    { SelectedIdP: cirbeUrls.certificateIdp },
    { referer: chooserPage.url, headers: { Origin: cirbeUrls.claveOrigin } },
  )
  return walkSamlChain(client, relay)
}
