import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import type { AffiliationReportResult } from './types/AffiliationReportResult'

/**
 * Emit the "informe sobre el número de la Seguridad Social o número de
 * afiliación" (service INAF0007) and download its PDF. The portal attaches it
 * on entry as a documento; nothing is posted.
 */
export const emitSocialSecurityNumber = async (
  client: HttpClient,
  outDir: string | undefined,
): Promise<AffiliationReportResult> =>
  emitAffiliationReport(
    client,
    {
      app: 'INAF0007',
      kind: 'nss',
      notes: [
        'the portal attaches the NSS informe when the service opens; nothing is filed',
      ],
    },
    outDir,
  )
