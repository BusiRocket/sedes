import type { PdfRef } from '../types/PdfRef'

/** An indirect reference to object `num`. */
export const pdfRefTo = (num: number, gen = 0): PdfRef => ({
  kind: 'ref',
  num,
  gen,
})
