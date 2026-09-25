import type { PdfCursor } from '../types/PdfCursor'
import type { PdfValue } from '../types/PdfValue'
import { parsePdfValue } from './parsePdfValue'
import { readPdfLexeme } from './readPdfLexeme'

/** Object number `index` inside a decoded object stream whose header ends at `first`. */
export const readCompressedObject = (
  data: Buffer,
  first: number,
  index: number,
): PdfValue => {
  const text = data.toString('latin1')
  const header: PdfCursor = { text, pos: 0 }
  let offset: string | undefined
  for (let pair = 0; pair <= index; pair += 1) {
    readPdfLexeme(header)
    offset = readPdfLexeme(header)
  }
  if (offset === undefined) throw new Error('object stream index out of range')
  return parsePdfValue({ text, pos: first + Number(offset) })
}
