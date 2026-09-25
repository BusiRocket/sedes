import type { PdfCursor } from './PdfCursor'
import type { PdfValue } from './PdfValue'

/** The value parser, passed to the dictionary and array parsers so they can recurse without an import cycle. */
export type PdfValueParser = (cursor: PdfCursor) => PdfValue
