import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { euroTextToCents } from './mappers/euroTextToCents'
import { performPaymentLetter } from './performPaymentLetter'
import { planPaymentLetter } from './planPaymentLetter'
import { readLetterContext } from './readLetterContext'
import type { PaymentLetterPlan } from './types/PaymentLetterPlan'
import type { PaymentLetterRequest } from './types/PaymentLetterRequest'

/**
 * `aeat carta-pago`: read the debt and plan a modelo 010 carta de pago; only
 * with `confirm` generate it. Generating pays nothing.
 */
export const generatePaymentLetter = async (
  client: HttpClient,
  request: PaymentLetterRequest,
  today: Date = new Date(),
): Promise<PaymentLetterPlan> => {
  await openAeatSession(client)
  const context = await readLetterContext(client, request.nif, today)
  const { plan, notes, ready, debt } = planPaymentLetter(context, request)
  const action = `generate AEAT modelo 010 carta de pago for ${request.clave} (${request.importe} EUR)`
  if (!request.confirm || !ready || !debt || !context.puv)
    return { action, executed: false, plan, notes, debt }
  const receipt = await performPaymentLetter(
    client,
    request,
    context.puv,
    euroTextToCents(debt.pendiente.text),
  )
  const pdfNote =
    request.outDir && !receipt.pdfPath
      ? [
          'FinalPago printed no PDF reference; the justificante stands without the PDF.',
        ]
      : []
  return {
    action,
    executed: true,
    plan,
    receipt,
    notes: [...notes, ...pdfNote],
    debt,
  }
}
