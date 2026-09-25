import type { RiskRequest } from './RiskRequest'

/** The answer of `cirbe informe`: whether the request was registered and the request list right after. */
export type CirbeReportResult = {
  readonly registered: boolean
  /** The IAS `EstadoPresentacion` of the last screen; `...#Informacion` is success. */
  readonly presentationState: string | undefined
  readonly periodo: string | undefined
  readonly errors: readonly string[]
  readonly requests: readonly RiskRequest[]
  readonly notes: readonly string[]
}
