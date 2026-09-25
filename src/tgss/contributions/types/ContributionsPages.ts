import type { ProsaSession } from '../../session/types/ProsaSession'
import type { ContributionsPage } from './ContributionsPage'

/** Every régimen page of the year, and the session as the last page left it. */
export type ContributionsPages = {
  readonly pages: readonly ContributionsPage[]
  readonly session: ProsaSession
}
