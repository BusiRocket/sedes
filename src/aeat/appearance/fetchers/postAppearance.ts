import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'
import type { SignatureIdentity } from '../types/SignatureIdentity'

/**
 * THE ACT: POST DetalleSede with `accion=firma`. "Firma básica" signs nothing
 * locally; the certificate-authenticated session is the signature. From this
 * answer on the holder is notified and the legal deadlines run.
 */
export const postAppearance = async (
  client: HttpClient,
  ncc: string,
  identity: SignatureIdentity,
): Promise<string> => {
  const url = `${aeatBaseUrl}/wlpl/GNNO-JDIT/DetalleSede?ncc=${encodeURIComponent(ncc)}`
  const response = await client.request(url, {
    method: 'POST',
    form: {
      accion: 'firma',
      FIRNIF: identity.nif,
      FIRNOMBRE: identity.nombre,
      FIR: 'FirmaBasica',
    },
    referer: url,
    defaultCharset: 'iso-8859-15',
  })
  if (response.status !== 200)
    throw new Error(
      `AEAT: comparecencia on ${ncc} answered HTTP ${String(response.status)}`,
    )
  return response.text
}
