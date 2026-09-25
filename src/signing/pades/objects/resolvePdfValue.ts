import { readPdfObject } from '../parsers/readPdfObject'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfValue } from '../types/PdfValue'

/** The value itself, or the object it references. */
export const resolvePdfValue = (
  doc: PdfDocument,
  value: PdfValue | undefined,
): PdfValue | undefined =>
  value?.kind === 'ref' ? readPdfObject(doc, value.num) : value
