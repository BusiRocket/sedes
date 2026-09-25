import type { ContributionRow } from './ContributionRow'

/** One régimen of the selected year; the screen pages by régimen. */
export type ContributionsPage = {
  readonly anio: string
  readonly regimen: string
  readonly rows: readonly ContributionRow[]
  readonly hasNext: boolean
}
