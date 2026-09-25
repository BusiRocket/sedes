/** Where the "certificado de situación" PDF was written and how large it is. */
export type SituationCertificateResult = {
  readonly pdfPath?: string
  readonly bytes?: number
  readonly notes: readonly string[]
}
