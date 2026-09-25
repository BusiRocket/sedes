/** What `sedes tgss vida-laboral` prints. */
export type VidaLaboralResult = {
  readonly holder?: string | undefined
  readonly naf?: string | undefined
  readonly desde: string
  readonly hasta: string
  readonly messages: readonly string[]
  readonly secuencial?: string | undefined
  readonly pdfPath?: string | undefined
  readonly bytes?: number | undefined
  readonly notes: readonly string[]
}
