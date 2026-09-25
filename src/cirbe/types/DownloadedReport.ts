/** One report file fetched from a resolved request. */
export type DownloadedReport = {
  /** `Informe Detallado` or `Informe Global`. */
  readonly tipo: string
  readonly fichero: string
  readonly path: string
  readonly bytes: number
}
