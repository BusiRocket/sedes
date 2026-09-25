import { mapGroupToEntries } from '../mappers/mapGroupToEntries'
import type { DeadlineEntry } from '../types/DeadlineEntry'
import type { FiscalCalendarQuery } from '../types/FiscalCalendarQuery'
import type { VerifiedCalendar } from '../types/VerifiedCalendar'

/** The entries of a calendar for one modelo and one period when asked, sorted by the last filing day. */
export const selectDeadlines = (
  calendar: VerifiedCalendar,
  query: FiscalCalendarQuery,
): DeadlineEntry[] => {
  const periodo = query.periodo?.toUpperCase()
  return calendar.groups
    .flatMap(mapGroupToEntries)
    .filter(
      (entry) =>
        (query.modelo === undefined || entry.modelo === query.modelo) &&
        (periodo === undefined || entry.periodo === periodo),
    )
    .sort((left, right) =>
      left.presentacion.hasta.localeCompare(right.presentacion.hasta),
    )
}
