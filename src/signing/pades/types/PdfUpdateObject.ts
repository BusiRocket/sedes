/** One object written by the incremental update, already serialised. */
export type PdfUpdateObject = {
  readonly num: number
  readonly gen: number
  readonly bytes: Buffer
}
