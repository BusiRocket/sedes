import type { DeadlineEntry } from './DeadlineEntry'

/** The answer of `papeleo calendario fiscal`. */
export type FiscalCalendar = {
  readonly ejercicio: number
  /** How a deadline on a non-working day moves; the dates already include it. */
  readonly aplazamiento: string
  readonly fuentes: readonly string[]
  readonly plazos: readonly DeadlineEntry[]
}
