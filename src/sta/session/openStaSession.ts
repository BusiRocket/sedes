import type { HttpClient } from '../../http/types/HttpClient'

/**
 * Log the holder in with a plain client certificate, no Cl@ve involved. A
 * holder without contact data lands on `CONFIRMACION_DATOS_PERSONALES`, and
 * saving that form is a write, so the read stops there instead.
 */
export const openStaSession = async (
  client: HttpClient,
  origin: string,
): Promise<void> => {
  const response = await client.request(
    `${origin}/sta/CarpetaPrivate/Certificate?APP_CODE=STA&PAGE_CODE=HOME`,
  )
  const host = new URL(origin).hostname
  if (response.url.includes('CONFIRMACION_DATOS_PERSONALES'))
    throw new Error(
      `${host}: the sede asks the holder to confirm contact data first; that is a write this tool does not make`,
    )
  if (!response.text.includes('CarpetaPrivate/Logout'))
    throw new Error(`${host}: certificate login did not open a session`)
}
