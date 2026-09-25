import type { PdfValue } from './PdfValue'

/** A PDF dictionary; keys without the leading slash. */
export type PdfDict = Extract<PdfValue, { kind: 'dict' }>
