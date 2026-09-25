import type { NotificationFilter } from '../types/NotificationFilter'

/** The window the AEAT sede keeps notifications reachable: the last twelve months up to `today`. */
export const filterForYear = (
  read: NotificationFilter['read'],
  today: Date,
): NotificationFilter => {
  const from = new Date(today)
  from.setFullYear(today.getFullYear() - 1)
  return { read, from, to: today }
}
