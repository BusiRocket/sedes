import type { AffiliationReportResult } from './AffiliationReportResult'

/** What `papeleo tgss alta` prints. */
export type EmploymentAtDateResult = AffiliationReportResult & {
  readonly fecha: string
}
