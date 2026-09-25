import type { PdfCursor } from '../types/PdfCursor'
import type { XrefEntry } from '../types/XrefEntry'
import type { XrefSection } from '../types/XrefSection'
import { parsePdfValue } from './parsePdfValue'
import { readPdfLexeme } from './readPdfLexeme'

/** Parse a classic `xref` table at `offset` and the `trailer` dictionary after it. */
export const parseXrefTable = (text: string, offset: number): XrefSection => {
  const cursor: PdfCursor = { text, pos: offset }
  if (readPdfLexeme(cursor) !== 'xref') throw new Error('xref keyword expected')
  const entries = new Map<number, XrefEntry>()
  for (
    let head = readPdfLexeme(cursor);
    head !== 'trailer';
    head = readPdfLexeme(cursor)
  ) {
    if (head === undefined) throw new Error('xref table without trailer')
    const first = Number(head)
    const count = Number(readPdfLexeme(cursor))
    for (let index = 0; index < count; index += 1) {
      const offsetField = readPdfLexeme(cursor)
      readPdfLexeme(cursor)
      const kind = readPdfLexeme(cursor)
      entries.set(
        first + index,
        kind === 'n'
          ? { type: 'offset', offset: Number(offsetField) }
          : { type: 'free' },
      )
    }
  }
  const trailer = parsePdfValue(cursor)
  if (trailer.kind !== 'dict') throw new Error('trailer dictionary expected')
  return { entries, trailer, isStream: false }
}
