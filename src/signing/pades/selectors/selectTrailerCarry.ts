import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'

/** The trailer entries an update must repeat: /Root, /Info and /ID. */
export const selectTrailerCarry = (
  trailer: PdfDict,
): (readonly [string, PdfValue])[] =>
  trailer.entries.filter(
    ([key]) => key === 'Root' || key === 'Info' || key === 'ID',
  )
