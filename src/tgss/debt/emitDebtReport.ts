import type { HttpClient } from '../../http/types/HttpClient'
import { driveProsaEmission } from '../prosa/fetchers/driveProsaEmission'
import type { ProsaSession } from '../session/types/ProsaSession'
import { debtReportCertificado } from './mappers/debtReportCertificado'
import type { DebtReportKind } from './types/DebtReportKind'
import type { EmitDebtReportOutcome } from './types/EmitDebtReportOutcome'

/**
 * Emit the "informe de deuda" of the holder (AECPSED1 option 7, or 6 for
 * the total-only report). The portal answers a message instead of a
 * document when it finds no debt, which is the `hasDebt: false` branch.
 */
export const emitDebtReport = async (
  client: HttpClient,
  session: ProsaSession,
  kind: DebtReportKind = 'detallado',
): Promise<EmitDebtReportOutcome> => {
  const outcome = await driveProsaEmission(
    client,
    session,
    debtReportCertificado[kind],
  )
  return outcome.issued
    ? { hasDebt: true, xml: outcome.xml }
    : { hasDebt: false, message: outcome.message }
}
