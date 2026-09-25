import { calendar2025 } from './data/calendar2025'
import { calendar2026 } from './data/calendar2026'
import type { VerifiedCalendar } from './types/VerifiedCalendar'

/** Every calendar year whose deadlines were read from the AEAT, by year. */
export const verifiedCalendars: ReadonlyMap<number, VerifiedCalendar> = new Map(
  [calendar2025, calendar2026].map((calendar) => [calendar.year, calendar]),
)
