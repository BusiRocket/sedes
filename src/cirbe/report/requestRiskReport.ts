import { defaultSleep } from '../../dehu/documents/defaultSleep'
import type { Sleep } from '../../dehu/documents/types/Sleep'
import type { HttpClient } from '../../http/types/HttpClient'
import { postCirbe } from '../fetchers/postCirbe'
import { nextExecutionKey } from '../mappers/nextExecutionKey'
import { readDatoValues } from '../parsers/readDatoValues'
import { readErrorFlags } from '../parsers/readErrorFlags'
import { readFlowState } from '../parsers/readFlowState'
import { readTag } from '../parsers/readTag'
import { cirbeUrls } from '../session/cirbeUrls'
import { openCirbeSession } from '../session/openCirbeSession'
import { listRiskRequests } from '../status/listRiskRequests'
import type { CirbeReportResult } from '../types/CirbeReportResult'
import type { RiskReportQuery } from '../types/RiskReportQuery'
import { assertRiskReportQuery } from '../validators/assertRiskReportQuery'
import { acceptPrivacyConditions } from './fetchers/acceptPrivacyConditions'
import { submitReportRequest } from './fetchers/submitReportRequest'

/**
 * Ask the Banco de España for the holder's own CIRBE risk report ("Petición de
 * informe") for the latest period the portal offers. Success is the
 * `PeticionInformeRiesgo#Informacion` screen; a `Final_Operacion` without
 * errors means the flow died silently. The report resolves asynchronously
 * (observed 14 minutes to 2 hours); `cirbe estado --out` downloads it.
 */
export const requestRiskReport = async (
  client: HttpClient,
  query: RiskReportQuery,
  sleep: Sleep = defaultSleep,
): Promise<CirbeReportResult> => {
  const settleMs = 5000
  assertRiskReportQuery(query)
  await openCirbeSession(client)
  const start = await postCirbe(client, cirbeUrls.requestFlow)
  const state = readFlowState(start.text, 'PeticionInformeRiesgo')
  const firstKey = state.executionKey ?? 'e1s1'
  await acceptPrivacyConditions(client, state, firstKey)
  const executionKey = nextExecutionKey(firstKey)
  const accepted = await submitReportRequest(client, {
    state,
    executionKey,
    query,
  })
  const presentationState = readTag(accepted.text, 'EstadoPresentacion')
  await sleep(settleMs)
  return {
    registered: presentationState?.endsWith('#Informacion') ?? false,
    presentationState,
    periodo: readDatoValues(start.text, 'Periodo').find((value) => value),
    errors: readErrorFlags(accepted.text),
    requests: await listRiskRequests(client),
    notes: [
      'the report resolves asynchronously (observed 14 minutes to 2 hours); download it with `cirbe estado --out <dir>` within 20 days of resolution',
    ],
  }
}
