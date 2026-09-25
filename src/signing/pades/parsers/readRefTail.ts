import type { PdfCursor } from '../types/PdfCursor'
import type { PdfRef } from '../types/PdfRef'
import { readPdfLexeme } from './readPdfLexeme'

/** After an integer `num`, read `gen R` if that is what follows; otherwise leave the cursor untouched. */
export const readRefTail = (
  cursor: PdfCursor,
  num: string,
): PdfRef | undefined => {
  const saved = cursor.pos
  const gen = readPdfLexeme(cursor)
  const keyword =
    gen !== undefined && /^\d+$/.test(gen) ? readPdfLexeme(cursor) : undefined
  if (gen !== undefined && keyword === 'R') {
    return { kind: 'ref', num: Number(num), gen: Number(gen) }
  }
  cursor.pos = saved
  return undefined
}
