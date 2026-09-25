import type { MoneyAmount } from './MoneyAmount'

/** Fields read from one DetalleDda page; each is undefined when its label was not present. */
export type DebtDetail = {
  readonly fechaLiquidacion?: string | undefined
  readonly importeDeuda?: MoneyAmount | undefined
  readonly cancelado?: MoneyAmount | undefined
  readonly principalHoy?: MoneyAmount | undefined
  readonly interesesHoy?: MoneyAmount | undefined
  readonly totalHoy?: MoneyAmount | undefined
}
