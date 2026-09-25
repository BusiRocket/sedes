import type { HttpClient } from '../../../http/types/HttpClient'
import { prosaCommonFields } from '../../prosa/prosaCommonFields'
import { readProsaPayload } from '../../session/readProsaPayload'
import { tgssUrls } from '../../session/tgssUrls'
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
): Promise<{ readonly ticket: string; readonly xml: string }> => {
  const generate = 'AC_GENERAR_FECHAS'
  const response = await client.request(tgssUrls.postForm(session.sessionId), {
    method: 'POST',
    form: {
      ...prosaCommonFields(session.ticket),
      fechaDesde: query.desde,
      fechaHasta: query.hasta,
      [`SPM.ACC.${generate}`]: generate,
    },
  })
  return readProsaPayload(response.text)
}
