import type { DeadlineGroup } from './DeadlineGroup'

/** The deadlines falling in one calendar year, as read from the AEAT pages listed in `sources`. */
export type VerifiedCalendar = {
  readonly year: number
  readonly sources: readonly string[]
  readonly groups: readonly DeadlineGroup[]
}
