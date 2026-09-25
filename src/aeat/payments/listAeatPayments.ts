import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { fetchPaymentReceipt } from './fetchers/fetchPaymentReceipt'
import { fetchPaymentsPage } from './fetchers/fetchPaymentsPage'
import { sumPaymentTotal } from './mappers/sumPaymentTotal'
import { parseHolderName } from './parsers/parseHolderName'
import { parsePaymentRows } from './parsers/parsePaymentRows'
import type { AeatPayment } from './types/AeatPayment'
import type { AeatPaymentsReport } from './types/AeatPaymentsReport'
import { writePaymentReceipt } from './writePaymentReceipt'

/**
 * Every payment MisPagos lists for the certificate holder, with the official
 * receipt PDFs downloaded when an output directory is given.
 */
export const listAeatPayments = async (
  client: HttpClient,
  nif: string,
  outDir: string | undefined,
): Promise<AeatPaymentsReport> => {
  const notes = [
    'MisPagos answers for the NIF of the certificate, never for a represented one',
    'a receipt does not carry the clave de liquidacion the payment was applied to',
  ]
  await openAeatSession(client)
  const html = await fetchPaymentsPage(client)
  const rows = parsePaymentRows(html)
  const payments: AeatPayment[] = []
  for (const row of rows) {
    if (outDir === undefined) {
      payments.push(row)
      continue
    }
    const pdf = await fetchPaymentReceipt(client, row.nrc)
    const pdfPath = await writePaymentReceipt(outDir, row.nrc, pdf)
    payments.push({ ...row, pdfPath })
  }
  return {
    nif,
    entity: parseHolderName(html),
    payments,
    total: sumPaymentTotal(payments),
    notes,
  }
}
