import type { PdfValue } from './PdfValue'

/** An indirect object's value and, for a stream object, where its data begins. */
export type ParsedObject = {
  readonly value: PdfValue
  readonly dataStart: number | undefined
}
