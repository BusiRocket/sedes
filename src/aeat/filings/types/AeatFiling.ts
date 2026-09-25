/** One filed declaration: its expediente, the CSV of its receipt and, when downloaded, the PDF path. */
export type AeatFiling = {
  readonly expediente: string
  readonly csv?: string | undefined
  readonly pdfPath?: string | undefined
}
