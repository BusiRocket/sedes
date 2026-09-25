import type { AeatFiling } from './AeatFiling'
import type { FilingsQuery } from './FilingsQuery'

/** What `sedes aeat declaraciones` prints for one search. */
export type AeatFilingsReport = {
  readonly nif: string
  readonly query: FilingsQuery
  readonly filings: readonly AeatFiling[]
  readonly count: number
  readonly notes: readonly string[]
}
