import type { PdfDict } from '../types/PdfDict'
import type { PdfUpdateObject } from '../types/PdfUpdateObject'
import { pdfDictWith } from './pdfDictWith'
import { pdfRaw } from './pdfRaw'
import { serializePdfValue } from './serializePdfValue'

/** Serialise a stream object; /Length is set from `data`. */
export const streamObject = (
  num: number,
  dict: PdfDict,
  data: Buffer,
): PdfUpdateObject => {
  const withLength = pdfDictWith(dict, 'Length', pdfRaw(String(data.length)))
  const head = `${String(num)} 0 obj\n${serializePdfValue(withLength)}\nstream\n`
  return {
    num,
    gen: 0,
    bytes: Buffer.concat([
      Buffer.from(head, 'latin1'),
      data,
      Buffer.from('\nendstream\nendobj\n', 'latin1'),
    ]),
  }
}
