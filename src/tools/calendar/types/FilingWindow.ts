/** A window of ISO dates, both ends included; `desde` is absent when the AEAT page states only the last day. */
export type FilingWindow = {
  readonly desde?: string | undefined
  readonly hasta: string
}
