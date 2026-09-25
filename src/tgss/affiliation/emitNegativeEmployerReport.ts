import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import type { AffiliationReportResult } from './types/AffiliationReportResult'

/**
 * Emit the "informe negativo de inscripción de empresario" (service INAF0005)
 * and download its PDF: the certificate that the holder is not registered as
 * an employer. The portal generates it on entry.
 */
export const emitNegativeEmployerReport = async (
  client: HttpClient,
  outDir: string | undefined,
): Promise<AffiliationReportResult> =>
  emitAffiliationReport(
    client,
    {
      app: 'INAF0005',
      kind: 'empresario',
      notes: [
        'a negative informe states the holder is not registered as an employer; a registered employer gets the portal refusal instead',
      ],
    },
    outDir,
  )
