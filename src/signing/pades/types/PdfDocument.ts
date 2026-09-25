import type { PdfDict } from './PdfDict'
import type { XrefEntry } from './XrefEntry'

/** A PDF opened for an incremental update: bytes, merged cross-reference, newest trailer. */
export type PdfDocument = {
  readonly pdf: Buffer
  /** The bytes as latin1 text: indices are byte offsets. */
  readonly text: string
  readonly entries: ReadonlyMap<number, XrefEntry>
  readonly trailer: PdfDict
  readonly startXref: number
  /** Whether the newest section is an xref stream, so the update writes one too. */
  readonly usesXrefStream: boolean
}
