/** What every INAF report command prints, before its own inputs. */
export type AffiliationReportResult = {
  readonly holder?: string | undefined
  readonly nif?: string | undefined
  readonly naf?: string | undefined
  readonly messages: readonly string[]
  readonly secuencial?: string | undefined
  readonly pdfPath?: string | undefined
  readonly bytes?: number | undefined
  readonly notes: readonly string[]
}
