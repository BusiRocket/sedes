import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchProsaAction } from '../../prosa/fetchers/fetchProsaAction'
import type { ProsaPayload } from '../../prosa/types/ProsaPayload'
import type { ProsaSession } from '../../session/types/ProsaSession'
import type { VidaLaboralQuery } from '../types/VidaLaboralQuery'

/**
 * Ask the INAF0011 screen to generate the informe by dates. The screen's CCC
 * and regimen generators (`AC_GENERAR_CCC`, `AC_GENERAR_REGIMEN`) are never
 * driven.
 */
export const fetchGeneratedInforme = async (
  client: HttpClient,
  session: ProsaSession,
  query: VidaLaboralQuery,
): Promise<ProsaPayload> =>
  fetchProsaAction(client, session, 'AC_GENERAR_FECHAS', {
    fechaDesde: query.desde,
    fechaHasta: query.hasta,
  })
