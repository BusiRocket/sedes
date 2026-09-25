import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import type { AffiliationReportResult } from './types/AffiliationReportResult'

/**
 * Emit the "informe de datos identificativos y de domicilio" (service
 * INAF0008) and download its PDF. The portal generates it on entry.
 */
export const emitIdentityData = async (
  client: HttpClient,
  outDir: string | undefined,
): Promise<AffiliationReportResult> =>
  emitAffiliationReport(
    client,
    {
      app: 'INAF0008',
      kind: 'datos',
      notes: [
        'the informe carries the identity and address the TGSS holds; the package never confirms or changes them',
      ],
    },
    outDir,
  )
