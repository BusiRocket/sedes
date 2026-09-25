import type { HttpClient } from '../http/HttpClient'
import type { EmitDebtReportOutcome } from './EmitDebtReportOutcome'
import { nextProsaAction } from './nextProsaAction'
import { prosaCommonFields } from './prosaCommonFields'
import type { ProsaSession } from './ProsaSession'
import { readAuditFields } from './readAuditFields'
import { readProsaPayload } from './readProsaPayload'
import { readXmlField } from './readXmlField'
import { readXmlMessages } from './readXmlMessages'
import { tgssUrls } from './tgssUrls'

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
