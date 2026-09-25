export type InformativeFiling = {
  readonly justificante: string
  readonly expediente: string
  readonly periodo: string
  readonly fechaPresentacion: string
  readonly complementaria: boolean
  readonly sustitutiva: boolean
  readonly estado: string
  readonly csv?: string | undefined
  readonly pdfPath?: string | undefined
}
