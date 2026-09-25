import type { PdfDocument } from './PdfDocument'
import type { XrefOffset } from './XrefOffset'

/** What an xref writer needs: the source, the written objects, where the xref starts and the new /Size. */
export type XrefWriteInput = {
  readonly doc: PdfDocument
  readonly offsets: readonly XrefOffset[]
  readonly xrefOffset: number
  readonly size: number
}
