import type { PdfValue } from '../types/PdfValue'

/** PDF source text for a parsed value. */
export const serializePdfValue = (value: PdfValue): string => {
  switch (value.kind) {
    case 'dict':
      return `<<${value.entries.map(([key, item]) => ` /${key} ${serializePdfValue(item)}`).join('')} >>`
    case 'array':
      return `[${value.items.map((item) => serializePdfValue(item)).join(' ')}]`
    case 'ref':
      return `${String(value.num)} ${String(value.gen)} R`
    case 'raw':
      return value.text
  }
}
