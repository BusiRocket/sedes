import type { ComboItem } from '../types/ComboItem'

/**
 * The `Comboitem` entries of a page or of a `zkau` response, in document
 * order. With `afterUuid` the scan starts at that combo's own declaration,
 * so the items of an earlier combo on the page are skipped.
 */
export const parseComboItems = (
  text: string,
  afterUuid?: string,
): readonly ComboItem[] => {
  const start = afterUuid === undefined ? -1 : text.indexOf(`'${afterUuid}'`)
  const scanned = start >= 0 ? text.slice(start) : text
  const pattern = /Comboitem','(\w+)',\{label:'((?:[^'\\]|\\.)*)'/g
  return [...scanned.matchAll(pattern)].map(([, uuid = '', label = '']) => ({
    uuid,
    label,
  }))
}
