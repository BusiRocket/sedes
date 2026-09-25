/** One month of the "bases y cuotas ingresadas" table, amounts in euros. */
export type ContributionRow = {
  readonly mes: string
  readonly base: number
  readonly cuota: number
  readonly recargo: number
  /** The screen marks the cuota `(**)` when the SEPE paid it. */
  readonly sepe: boolean
}
