import type { FilingWindow } from './FilingWindow'

/** The deadline of one tax period of a group of modelos. */
export type PeriodDeadline = {
  /** `1T`-`4T` quarters, `0A` a year, `1P`-`3P` corporate-tax instalments. */
  readonly periodo: string
  /** The year the period belongs to, which for a 4T or an annual return is the year before the deadline. */
  readonly ejercicioDevengo: number
  readonly presentacion: FilingWindow
  /** The window to file with a direct debit of the payment; absent when the modelo carries no payment. */
  readonly domiciliacion?: FilingWindow | undefined
}
