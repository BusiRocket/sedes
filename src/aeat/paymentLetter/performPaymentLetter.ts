import type { HttpClient } from '../../http/types/HttpClient'
import { fetchLetterPdf } from './fetchers/fetchLetterPdf'
import { postDebtStep } from './fetchers/postDebtStep'
import { debtDetailForm } from './mappers/debtDetailForm'
import { euroTextToCents } from './mappers/euroTextToCents'
import { finalPaymentForm } from './mappers/finalPaymentForm'
import { partialPaymentForm } from './mappers/partialPaymentForm'
import { paymentSummaryForm } from './mappers/paymentSummaryForm'
import { parseLetterDocumentNcc } from './parsers/parseLetterDocumentNcc'
import { parseLetterJustificante } from './parsers/parseLetterJustificante'
import { readStepInput } from './parsers/readStepInput'
import type { PaymentLetterReceipt } from './types/PaymentLetterReceipt'
import type { PaymentLetterRequest } from './types/PaymentLetterRequest'
import { writeLetterPdf } from './writeLetterPdf'

/**
 * Walk PagarParcial -> DetalleDda -> ResumenDdas -> FinalPago and save the
 * carta de pago. Stops at FinalPago: no gateway (OVPP-PAGO) button is posted.
 */
export const performPaymentLetter = async (
  client: HttpClient,
  request: PaymentLetterRequest,
  puv: string,
  pendingCents: number,
): Promise<PaymentLetterReceipt> => {
  const { nif, clave } = request
  const partial = await postDebtStep(
    client,
    'PagarParcial',
    partialPaymentForm(nif, puv),
  )
  if (!partial.includes(clave))
    throw new Error(
      `AEAT: PagarParcial did not list ${clave} (a pending notification blocks payments, or the debt takes no partial payment); nothing was generated`,
    )
  const detail = await postDebtStep(
    client,
    'DetalleDda',
    debtDetailForm(readStepInput(partial, nif, clave)),
  )
  const summary = await postDebtStep(
    client,
    'ResumenDdas',
    paymentSummaryForm(readStepInput(detail, nif, clave), pendingCents),
  )
  const final = await postDebtStep(
    client,
    'FinalPago',
    finalPaymentForm(
      readStepInput(summary, nif, clave),
      pendingCents,
      euroTextToCents(request.importe),
    ),
  )
  const justificante = parseLetterJustificante(final)
  if (!justificante)
    throw new Error(`AEAT: FinalPago for ${clave} printed no justificante`)
  const receipt = { clave, importe: request.importe, justificante }
  const ncc = parseLetterDocumentNcc(final)
  if (!request.outDir || !ncc) return receipt
  const pdf = await fetchLetterPdf(client, ncc, justificante)
  return {
    ...receipt,
    pdfPath: await writeLetterPdf(request.outDir, justificante, pdf),
  }
}
