import type { GobexRecord } from './GobexRecord'

/** A search's own grid, every page of it, and any other grid the page carries (keyed by table id). */
export type GobexSearch = {
  readonly rows: readonly GobexRecord[]
  readonly otherGrids: Readonly<Record<string, readonly GobexRecord[]>>
}
