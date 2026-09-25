import type { PaymentLetterContext } from './types/PaymentLetterContext'
import type { PaymentLetterOutcome } from './types/PaymentLetterOutcome'
import type { PaymentLetterRequest } from './types/PaymentLetterRequest'
import { letterBlockers } from './validators/letterBlockers'

/** The steps a confirmed carta de pago would run, with what blocks or qualifies it. */
export const planPaymentLetter = (
  context: PaymentLetterContext,
  request: PaymentLetterRequest,
): PaymentLetterOutcome => {
  const debt = context.debts.find((row) => row.clave === request.clave)
  const blockers = letterBlockers(context, request, debt)
  const warnings = /embarg/i.test(debt?.situacion ?? '')
    ? [
        'The debt is under embargo: a carta de pago for it must be paid the same day it is generated.',
      ]
    : []
  const plan = [
    'POST SRVO-JDIT/PagarParcial: the partial-payment list.',
    `POST DetalleDda and ResumenDdas for ${request.clave}.`,
    `POST FinalPago with ${request.importe} EUR: generates a modelo 010 justificante. Nothing is charged; the debt is paid only when a bank returns an NRC for it.`,
    request.outDir
      ? 'GET VerPdfWlpl: save the carta de pago PDF.'
      : 'Without --out the carta de pago PDF is not downloaded.',
    'Each run mints a new justificante; an earlier one keeps its frozen amount and interest.',
  ]
  return {
    plan,
    notes: [...blockers, ...warnings],
    ready: blockers.length === 0,
    debt,
  }
}
