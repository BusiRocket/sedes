import { postForm } from '../../../http/postForm'
import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { selectIdpChooserForm } from './selectIdpChooserForm'
import { selectSamlRelayForm } from './selectSamlRelayForm'

/**
 * Pick the AFIRMA (certificate) identity provider on the Cl@ve chooser and
 * authenticate with the client's certificate. `SelectedIdP` is set by an
 * onclick on the page rather than by a hidden field, so it is added here.
 */
export const selectIdpAndAuthenticate = async (
  client: HttpClient,
  chooserPage: HttpResponse,
): Promise<HttpResponse> => {
  const chooserForm = selectIdpChooserForm(chooserPage.text, chooserPage.url)
  if (!chooserForm)
    throw new Error('DEHU: no identity-provider chooser form found')
  const redirectPage = await postForm(
    client,
    chooserForm,
    { SelectedIdP: 'AFIRMA' },
    { referer: chooserPage.url },
  )
  const authenticateForm = selectSamlRelayForm(
    redirectPage.text,
    redirectPage.url,
  )
  if (!authenticateForm)
    throw new Error(
      'DEHU: no SAML relay form after identity-provider selection',
    )
  return postForm(client, authenticateForm, {}, { referer: redirectPage.url })
}
