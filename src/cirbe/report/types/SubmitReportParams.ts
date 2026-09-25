import type { FlowState } from '../../types/FlowState'
import type { RiskReportQuery } from '../../types/RiskReportQuery'

/** What the Aceptar event of the petición needs. */
export type SubmitReportParams = {
  readonly state: FlowState
  readonly executionKey: string
  readonly query: RiskReportQuery
}
