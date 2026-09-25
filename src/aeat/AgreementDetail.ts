import type { MoneyAmount } from './MoneyAmount'

/**
 * Fields read from one AcuAccDeta page: the named ones the notes pin down, plus
 * every liquidation key it mentions and the raw cells of its plazos table,
 * kept for whatever the named fields did not capture.
 */
export type AgreementDetail = {
  readonly estado?: string | undefined
  readonly resolucion?: string | undefined
  readonly importe?: MoneyAmount | undefined
  readonly notificado?: string | undefined
  readonly plazos?: string | undefined
  readonly primerPlazo?: string | undefined
  readonly deudas: readonly string[]
  readonly instalments: readonly (readonly string[])[]
}
