import type { XrefEntry } from '../types/XrefEntry'

/** One decoded xref stream row as an entry; a missing type field means type 1. */
export const mapXrefStreamRow = (
  type: number | undefined,
  second: number | undefined,
  third: number | undefined,
): XrefEntry => {
  if (type === 0) return { type: 'free' }
  if (type === 2)
    return { type: 'compressed', stream: second ?? 0, index: third ?? 0 }
  return { type: 'offset', offset: second ?? 0 }
}
