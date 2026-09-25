import type { FilingsQuery } from './FilingsQuery'

/** One result row to resolve, with the desktop it belongs to and where to write its PDF. */
export type ReadFilingParams = {
  readonly desktopId: string
  readonly expediente: string
  readonly verUuid: string
  readonly query: FilingsQuery
  readonly outDir?: string | undefined
}
