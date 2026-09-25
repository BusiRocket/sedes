/** Where a Spring WebFlow conversation stands: the snapshot key to post to and the IAS request id. */
export type FlowState = {
  readonly executionKey: string | undefined
  readonly idUnico: string
}
