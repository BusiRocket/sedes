import type { HttpClient } from '../../http/types/HttpClient'
import { nextProsaAction } from '../prosa/nextProsaAction'
import { readAuditFields } from '../prosa/parsers/readAuditFields'
import { readXmlField } from '../prosa/parsers/readXmlField'
import { readXmlMessages } from '../prosa/parsers/readXmlMessages'
import { prosaCommonFields } from '../prosa/prosaCommonFields'
import { readProsaPayload } from '../session/readProsaPayload'
import { tgssUrls } from '../session/tgssUrls'
import type { ProsaSession } from '../session/types/ProsaSession'
import type { EmitDebtReportOutcome } from './types/EmitDebtReportOutcome'

/**
 * Emit report 7 ("informe de deuda exigible") and drive the Continuar screen
 * (IMPRIMIR, or CONFIRMAR / CONFIRMAR_SIT_68 first when the state asks for it)
 * to either a ready document or a no-debt/no-CCC answer.
 */
export const emitDebtReport = async (
  client: HttpClient,
  session: ProsaSession,
): Promise<EmitDebtReportOutcome> => {
  const maxConfirmationSteps = 4
  const url = tgssUrls.postForm(session.sessionId)
  const entryFields = {
    ...prosaCommonFields(session.ticket),
    certificado: '7',
    'SPM.ACC.CONTINUAR': 'CONTINUAR',
  }
  const entryResponse = await client.request(url, {
    method: 'POST',
    form: entryFields,
  })
  let payload = readProsaPayload(entryResponse.text)
  if (!readXmlField(payload.xml, 'tipoEjecucion'))
    return {
      hasDebt: false,
      message: readXmlMessages(payload.xml)[0] ?? 'TGSS returned no message',
    }
  for (let step = 0; step < maxConfirmationSteps; step += 1) {
    const action = nextProsaAction(payload.xml)
    const fields = {
      ...prosaCommonFields(payload.ticket),
      ...readAuditFields(payload.xml),
      [`SPM.ACC.${action}`]: action,
    }
    const response = await client.request(url, { method: 'POST', form: fields })
    payload = readProsaPayload(response.text)
    if (action === 'IMPRIMIR') break
  }
  const messages = readXmlMessages(payload.xml)
  if (
    messages.some((text) =>
      text.toUpperCase().includes('NO SE HA ENCONTRADO DEUDA'),
    )
  )
    return { hasDebt: false, message: messages[0] ?? '' }
  return { hasDebt: true, xml: payload.xml }
}
