/** One debt document row from an "informe de deuda exigible": a payment claim behind the total. */
export type DebtDocument = {
  readonly identificador: string
  readonly numeroDocumento: string
  readonly periodo: string
  readonly importe: string
  readonly importeEuros: number
}
