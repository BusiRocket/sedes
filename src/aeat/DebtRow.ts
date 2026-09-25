import type { MoneyAmount } from './MoneyAmount'

/** One row of the 'Relación de deudas' table, before concept fields and detail are merged in. */
export type DebtRow = {
  readonly clave: string
  readonly concepto: string
  readonly pendiente: MoneyAmount
  readonly aIngresar?: MoneyAmount | undefined
  readonly periodoRecaudacion?: string | undefined
  readonly situacion?: string | undefined
}
