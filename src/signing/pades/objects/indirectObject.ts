import type { PdfUpdateObject } from '../types/PdfUpdateObject'
import type { PdfValue } from '../types/PdfValue'
import { serializePdfValue } from './serializePdfValue'

/** Serialise `num gen obj <value> endobj`. */
export const indirectObject = (
  num: number,
  gen: number,
  value: PdfValue,
): PdfUpdateObject => ({
  num,
  gen,
  bytes: Buffer.from(
    `${String(num)} ${String(gen)} obj\n${serializePdfValue(value)}\nendobj\n`,
    'latin1',
  ),
})
