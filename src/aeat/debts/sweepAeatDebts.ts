import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { parseEntityName } from '../session/parseEntityName'
import { fetchAgreements } from './fetchers/fetchAgreements'
import { fetchDebtDetail } from './fetchers/fetchDebtDetail'
import { fetchDebtList } from './fetchers/fetchDebtList'
import { buildDebt } from './mappers/buildDebt'
import { sumDebtTotals } from './mappers/sumDebtTotals'
import { parseDebtDetail } from './parsers/parseDebtDetail'
import { parseDebtRows } from './parsers/parseDebtRows'
import { parseNoDebtsHint } from './parsers/parseNoDebtsHint'
import type { AeatDebtReport } from './types/AeatDebtReport'
import type { Debt } from './types/Debt'

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
