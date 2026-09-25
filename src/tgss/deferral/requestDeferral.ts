import type { WriteResult } from '../../write/types/WriteResult'
import { readPdfDocument } from '../attachments/fetchers/readPdfDocument'
import { mapDeferralPlan } from './mappers/mapDeferralPlan'
import type { DeferralQuery } from './types/DeferralQuery'
import type { DeferralReceipt } from './types/DeferralReceipt'

/**
 * Apply for an aplazamiento (XV207A01). Without confirmation nothing is sent:
 * entering XV207A01 resumes or locks the server-side draft, so it is not a
 * side-effect-free read. With confirmation it refuses before the first
 * request, because the firma optimizada exchange and the full field set of
 * each screen have no HTTP capture yet; a half-walked draft locks the
 * application for minutes and stays on the server.
 */
export const requestDeferral = async (
  query: DeferralQuery,
  confirmed: boolean,
): Promise<WriteResult<DeferralReceipt>> => {
  const document = await readPdfDocument(query.documento)
  const plan = mapDeferralPlan(query, document)
  if (confirmed)
    throw new Error(
      "tgss aplazamiento cannot submit yet: the FIRMA_* signing exchange and the screens' field sets have not been captured at HTTP level. Nothing was sent.",
    )
  return {
    action: 'tgss aplazamiento',
    executed: false,
    plan,
    notes: [
      'No request was made: entering XV207A01 opens or locks the server-side draft.',
      'An aplazamiento is a legal act; it needs --confirmar si and a captured signing contract.',
    ],
  }
}
