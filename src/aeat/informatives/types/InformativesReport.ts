import type { InformativeFiling } from './InformativeFiling'
import type { InformativesQuery } from './InformativesQuery'

export type InformativesReport = {
  readonly nif: string
  readonly query: InformativesQuery
  readonly filings: readonly InformativeFiling[]
  readonly count: number
  readonly notes: readonly string[]
}
