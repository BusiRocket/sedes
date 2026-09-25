import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'

/** A copy of `dict` with `key` set to `value`, replaced in place or appended. */
export const pdfDictWith = (
  dict: PdfDict,
  key: string,
  value: PdfValue,
): PdfDict => {
  const exists = dict.entries.some(([name]) => name === key)
  return {
    kind: 'dict',
    entries: exists
      ? dict.entries.map(
          ([name, old]) => [name, name === key ? value : old] as const,
        )
      : [...dict.entries, [key, value] as const],
  }
}
