import type { AffiliationReportResult } from './AffiliationReportResult'

/** What `ventanilla-unica tgss alta` prints. */
export type EmploymentAtDateResult = AffiliationReportResult & {
  readonly fecha: string
}
