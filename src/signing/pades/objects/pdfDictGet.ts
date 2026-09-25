import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'

/** The value under `key` (without slash), or undefined. */
export const pdfDictGet = (dict: PdfDict, key: string): PdfValue | undefined =>
  dict.entries.find(([name]) => name === key)?.[1]
