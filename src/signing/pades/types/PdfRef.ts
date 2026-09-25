import type { PdfValue } from './PdfValue'

/** An indirect reference `num gen R`. */
export type PdfRef = Extract<PdfValue, { kind: 'ref' }>
