import type { PdfDict } from './PdfDict'
import type { XrefEntry } from './XrefEntry'

/** One cross-reference section (table or stream) with its trailer dictionary. */
export type XrefSection = {
  readonly entries: ReadonlyMap<number, XrefEntry>
  readonly trailer: PdfDict
  readonly isStream: boolean
}
