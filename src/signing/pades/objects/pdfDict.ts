import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'

/** A dictionary from `[key, value]` pairs, in order. */
export const pdfDict = (
  entries: readonly (readonly [string, PdfValue])[],
): PdfDict => ({
  kind: 'dict',
  entries,
})
