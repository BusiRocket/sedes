import type { PdfValue } from '../types/PdfValue'

/** A value kept as source text: a name, number, string or keyword. */
export const pdfRaw = (text: string): PdfValue => ({ kind: 'raw', text })
