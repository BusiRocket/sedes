import { mapXrefStreamRow } from '../mappers/mapXrefStreamRow'
import type { XrefEntry } from '../types/XrefEntry'
import { readXrefField } from './readXrefField'

/** The entry encoded at `at` in a decoded xref stream with field widths `widths`. */
export const readXrefRow = (
  data: Buffer,
  at: number,
  widths: readonly number[],
): XrefEntry => {
  const [typeWidth = 1, secondWidth = 0, thirdWidth = 0] = widths
  const type = readXrefField(data, at, typeWidth)
  const second = readXrefField(data, at + typeWidth, secondWidth)
  const third = readXrefField(data, at + typeWidth + secondWidth, thirdWidth)
  return mapXrefStreamRow(type ?? 1, second, third)
}
