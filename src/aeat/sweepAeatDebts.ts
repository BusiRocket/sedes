import type { HttpClient } from '../http/HttpClient'
import type { AeatDebtReport } from './AeatDebtReport'
import { buildDebt } from './buildDebt'
import type { Debt } from './Debt'
import { fetchAgreements } from './fetchAgreements'
import { fetchDebtDetail } from './fetchDebtDetail'
import { fetchDebtList } from './fetchDebtList'
import { openAeatSession } from './openAeatSession'
import { parseDebtDetail } from './parseDebtDetail'
import { parseDebtRows } from './parseDebtRows'
import { parseEntityName } from './parseEntityName'
import { parseNoDebtsHint } from './parseNoDebtsHint'
import { sumDebtTotals } from './sumDebtTotals'

/**
 * Read-only AEAT debt sweep for one NIF: open the session, read the pending
 * debts with their detail, and read every SRAF deferral agreement.
 */
export const sweepAeatDebts = async (
  client: HttpClient,
  nif: string,
): Promise<AeatDebtReport> => {
  await openAeatSession(client)
  const listHtml = await fetchDebtList(client, nif)
  const rows = parseDebtRows(listHtml)
  const entity = parseEntityName(listHtml)
  const hint = rows.length === 0 ? parseNoDebtsHint(listHtml) : undefined
  // A page with neither a holder nor the portal's own "no debts" notice is
  // not the debt list: an error page must not read as a clean position.
  if (entity === undefined && rows.length === 0 && hint === undefined)
    throw new Error('AEAT: unexpected page instead of the debt list')
  const debts: Debt[] = []
  for (const row of rows) {
    const detailHtml = await fetchDebtDetail(client, nif, row.clave)
    debts.push(buildDebt(row, parseDebtDetail(detailHtml)))
  }
  const agreements = await fetchAgreements(client)
  return {
    nif,
    entity,
    debts,
    agreements,
    totals: sumDebtTotals(debts),
    hint,
  }
}
