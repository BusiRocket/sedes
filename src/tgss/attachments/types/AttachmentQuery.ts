/** What `ventanilla-unica tgss adjuntar` asks for: one PDF added to one CEUS expediente. */
export type AttachmentQuery = {
  readonly expediente: string
  readonly documento: string
  readonly tipo: string
}
