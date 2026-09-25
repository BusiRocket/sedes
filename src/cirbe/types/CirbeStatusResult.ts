import type { DownloadedReport } from './DownloadedReport'
import type { RiskRequest } from './RiskRequest'

/** The answer of `cirbe estado`: the holder's report requests and, with `--out`, the files of the latest resolved one. */
export type CirbeStatusResult = {
  readonly requests: readonly RiskRequest[]
  readonly downloaded: readonly DownloadedReport[]
  readonly notes: readonly string[]
}
