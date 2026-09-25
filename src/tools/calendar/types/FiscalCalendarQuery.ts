/** Which deadlines to read: the calendar year they fall in, optionally one modelo and one period. */
export type FiscalCalendarQuery = {
  readonly ejercicio: number
  readonly modelo?: string | undefined
  readonly periodo?: string | undefined
}
