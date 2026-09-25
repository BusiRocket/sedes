/** How `signPdf` presents the signature. */
export type SignPdfOptions = {
  /** Draw a "Firmado por <CN>" stamp on page 1; invisible by default. */
  readonly visible?: boolean | undefined
  readonly reason?: string | undefined
  readonly location?: string | undefined
  /** The signing time; now by default. */
  readonly date?: Date | undefined
}
