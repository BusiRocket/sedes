import type { MoneyAmount } from '../../money/types/MoneyAmount'
import type { ConceptFields } from './ConceptFields'
import type { DebtDetail } from './DebtDetail'
import type { DebtState } from './DebtState'

/** One pending debt as the report exposes it: its row, concept fields, state and detail. */
export type Debt = ConceptFields & {
  readonly clave: string
  readonly concepto: string
  readonly pendiente: MoneyAmount
  readonly aIngresar?: MoneyAmount | undefined
  readonly periodoRecaudacion?: string | undefined
  readonly situacion?: string | undefined
  readonly estado: DebtState
  readonly detail?: DebtDetail | undefined
}
