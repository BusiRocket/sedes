import type { ListState } from './ListState'

/** What one `listNotifications` call reads: which states, and the year a realized sweep covers. */
export type ListQuery = {
  readonly state: ListState
  readonly year?: number | undefined
}
