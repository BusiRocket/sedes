import type { AffiliationReportResult } from './AffiliationReportResult'

/** What `sedes tgss alta` prints. */
export type EmploymentAtDateResult = AffiliationReportResult & {
  readonly fecha: string
}
