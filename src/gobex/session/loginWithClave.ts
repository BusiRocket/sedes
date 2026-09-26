import { selectIdpChooserForm } from '../../dehu/session/selectors/selectIdpChooserForm'
import { parseFirstForm } from '../../html/parsers/parseFirstForm'
import { postForm } from '../../http/postForm'
import type { HttpClient } from '../../http/types/HttpClient'
import { walkSamlChain } from '../../sepe/session/walkSamlChain'
import { submitImageButton } from '../fetchers/submitImageButton'
import { gobexUrls } from './gobexUrls'

/**
 * Open the Carpeta Ciudadana under the certificate holder: the "Continuar"
 * button of the Cl@ve access page answers a SAML form for the pasarela, the
 * IdP chooser is answered with the certificate option, and the relay lands
 * on the private area.
 */
export const loginWithClave = async (client: HttpClient): Promise<void> => {
  const access = await client.request(gobexUrls.claveAccess)
  const saml = await submitImageButton(client, access, 'bt_continuar')
  const entry = parseFirstForm(saml.text, saml.url)
  if (!entry) throw new Error(`Junta: no Cl@ve entry form at ${saml.url}`)
  const chooserPage = await postForm(
    client,
    entry,
    {},
    { referer: saml.url, headers: { Origin: gobexUrls.origin } },
  )
  const chooser = selectIdpChooserForm(chooserPage.text, chooserPage.url)
  if (!chooser) throw new Error(`Junta: no IdP chooser at ${chooserPage.url}`)
  const relay = await postForm(
    client,
    chooser,
    { SelectedIdP: gobexUrls.certificateIdp },
    { referer: chooserPage.url, headers: { Origin: gobexUrls.claveOrigin } },
  )
  const landed = await walkSamlChain(client, relay)
  if (
    !landed.url.includes('/SEDE/privado/') ||
    !landed.text.includes('logout.jsp')
  )
    throw new Error(
      `Junta: the Cl@ve login did not reach the Carpeta Ciudadana (landed on ${landed.url})`,
    )
}
