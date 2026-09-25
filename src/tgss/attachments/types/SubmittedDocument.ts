/** A local PDF checked before anything is planned or sent. */
export type SubmittedDocument = {
  readonly path: string
  readonly fileName: string
  readonly bytes: number
}
