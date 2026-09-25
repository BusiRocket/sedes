import type { PdfValue } from '../types/PdfValue'

/** The number a raw value holds, or undefined when it is not a plain number. */
export const pdfRawNumber = (
  value: PdfValue | undefined,
): number | undefined =>
  value?.kind === 'raw' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.text)
    ? Number(value.text)
    : undefined
