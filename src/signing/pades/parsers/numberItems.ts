import { pdfRawNumber } from '../objects/pdfRawNumber'
import type { PdfValue } from '../types/PdfValue'

/** The numbers of an array value (empty when the value is not an array). */
export const numberItems = (value: PdfValue | undefined): number[] =>
  value?.kind === 'array'
    ? value.items.map((item) => pdfRawNumber(item) ?? 0)
    : []
