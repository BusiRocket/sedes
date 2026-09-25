import { findVerifiedCalendar } from './findVerifiedCalendar'
import { rolloverRule } from './rolloverRule'
import { selectDeadlines } from './selectors/selectDeadlines'
import type { FiscalCalendar } from './types/FiscalCalendar'
import type { FiscalCalendarQuery } from './types/FiscalCalendarQuery'

/**
 * The filing deadlines that fall in a calendar year, from AEAT pages only.
 * A modelo the year's sources do not list is refused rather than answered
 * with an empty list, which would read as "nothing to file".
 */
export const readFiscalCalendar = (
  query: FiscalCalendarQuery,
): FiscalCalendar => {
  const calendar = findVerifiedCalendar(query.ejercicio)
  const listed = calendar.groups.some((group) =>
    group.modelos.some((modelo) => modelo === query.modelo),
  )
  if (query.modelo !== undefined && !listed) {
    throw new Error(
      `modelo ${query.modelo} is not verified in the ${String(query.ejercicio)} calendar`,
    )
  }
  return {
    ejercicio: calendar.year,
    aplazamiento: rolloverRule,
    fuentes: calendar.sources,
    plazos: selectDeadlines(calendar, query),
  }
}
