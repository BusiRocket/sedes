import type { GobexGrid } from '../types/GobexGrid'
import type { GobexRecord } from '../types/GobexRecord'
import { mapGridRow } from './mapGridRow'

/** The non-empty grids besides `main`, keyed by the last segment of their id. */
export const mapOtherGrids = (
  grids: readonly GobexGrid[],
  main: GobexGrid,
): Record<string, GobexRecord[]> =>
  Object.fromEntries(
    grids
      .filter((grid) => grid !== main && grid.rows.length > 0)
      .map((grid) => [
        grid.id.split(':').pop() ?? grid.id,
        grid.rows.map((cells) => mapGridRow(grid.headers, cells)),
      ]),
  )
