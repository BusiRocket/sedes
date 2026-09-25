import type { FlowState } from './FlowState'

/** One step of the download subflow: where the flow stands and the answer that took it there. */
export type DownloadStep = {
  readonly state: FlowState
  readonly xml: string
}
