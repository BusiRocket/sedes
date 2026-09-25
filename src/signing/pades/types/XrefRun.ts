import type { XrefOffset } from './XrefOffset'

/** Consecutive object numbers, one xref subsection. */
export type XrefRun = {
  readonly first: number
  readonly entries: readonly XrefOffset[]
}
