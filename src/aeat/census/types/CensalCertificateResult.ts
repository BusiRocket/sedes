export type CensalCertificateResult = {
  readonly nif: string
  readonly nombre: string
  readonly csv: string
  readonly pdfPath?: string | undefined
  readonly bytes?: number | undefined
  readonly notes: readonly string[]
}
