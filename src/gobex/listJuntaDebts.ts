import type { HttpClient } from '../http/types/HttpClient'
import { searchGobexReport } from './fetchers/searchGobexReport'
import { gobexUrls } from './session/gobexUrls'
import { loginWithClave } from './session/loginWithClave'
import type { GobexRecord } from './types/GobexRecord'

/** The holder's debts with the Junta de Extremadura, every state, from the Carpeta Ciudadana. */
export const listJuntaDebts = async (
  client: HttpClient,
): Promise<{
  readonly debts: readonly GobexRecord[]
  readonly pending: number
}> => {
  await loginWithClave(client)
  const { rows: debts } = await searchGobexReport(client, gobexUrls.debts)
  return {
    debts,
    pending: debts.filter((debt) => /^Pendiente/i.test(debt['status'] ?? ''))
      .length,
  }
}
