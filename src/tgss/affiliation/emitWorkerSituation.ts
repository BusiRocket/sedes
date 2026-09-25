import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import type { AffiliationReportResult } from './types/AffiliationReportResult'

/**
 * Emit the "informe de situación actual del trabajador" (service INAF0013)
 * and download its PDF. The portal generates it on entry; nothing is posted.
 */
export const emitWorkerSituation = async (
  client: HttpClient,
  outDir: string | undefined,
): Promise<AffiliationReportResult> =>
  emitAffiliationReport(
    client,
    {
      app: 'INAF0013',
      kind: 'situacion',
      notes: [
        'the portal generates the informe when the service opens; it changes nothing about the holder',
      ],
    },
    outDir,
  )
