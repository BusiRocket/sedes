import type { MoneyAmount } from '../../money/types/MoneyAmount'
import type { ModeloField } from './ModeloField'

/** One payment of the MisPagos list; the NRC is the portal's full receipt reference. */
export type AeatPayment = ModeloField & {
  readonly tipo: string
  readonly justificante: string
  readonly nrc: string
  readonly importe: MoneyAmount
  readonly entidad: string
  /** ISO date (yyyy-mm-dd) of the payment. */
  readonly fecha: string
  readonly pdfPath?: string | undefined
}
