/** Where a generated report sits in the Prosa session: a PREVIEW (informe) or an ATTACHMENT (documento). */
export type ReportDocument = {
  readonly secuencial: string
  readonly typeView: 'DOCUMENTO' | 'INFORME'
}
