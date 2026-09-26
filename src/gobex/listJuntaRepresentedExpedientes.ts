import type { HttpClient } from '../http/types/HttpClient'
import { searchGobexReport } from './fetchers/searchGobexReport'
import { gobexUrls } from './session/gobexUrls'
import { loginWithClave } from './session/loginWithClave'
import type { GobexRecord } from './types/GobexRecord'

/** The expedientes the holder takes part in as or through a representative, every state. */
export const listJuntaRepresentedExpedientes = async (
  client: HttpClient,
): Promise<{ readonly expedientes: readonly GobexRecord[] }> => {
  await loginWithClave(client)
  const { rows: expedientes } = await searchGobexReport(
    client,
    gobexUrls.representedExpedientes,
    (form) => ({ [`${form}:estadoTramite`]: '' }),
  )
  return { expedientes }
}
