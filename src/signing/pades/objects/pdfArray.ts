import type { PdfValue } from '../types/PdfValue'

/** An array value. */
export const pdfArray = (items: readonly PdfValue[]): PdfValue => ({
  kind: 'array',
  items,
})
