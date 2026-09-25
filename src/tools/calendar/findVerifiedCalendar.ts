import type { VerifiedCalendar } from './types/VerifiedCalendar'
import { verifiedCalendars } from './verifiedCalendars'

/** The verified calendar of a year, or an error naming the years that are verified. */
export const findVerifiedCalendar = (year: number): VerifiedCalendar => {
  const calendar = verifiedCalendars.get(year)
  if (calendar === undefined) {
    const known = [...verifiedCalendars.keys()].join(', ')
    throw new Error(
      `the ${String(year)} calendar is not verified against the AEAT; verified years: ${known}`,
    )
  }
  return calendar
}
