import { unescapeZkLabel } from '../mappers/unescapeZkLabel'
import type { ComboItem } from '../types/ComboItem'

/**
 * The uuid of the combo item that names `wanted`: an exact label, or a label
 * that starts with it followed by a space or ` -` (`303 - IVA`).
 */
export const selectComboItem = (
  items: readonly ComboItem[],
  wanted: string,
): string => {
  const needle = wanted.trim()
  const found = items.find(({ label }) => {
    const text = unescapeZkLabel(label)
    return (
      text === needle ||
      text.startsWith(`${needle} `) ||
      text.startsWith(`${needle} -`)
    )
  })
  if (!found) {
    const sample = items.slice(0, 20).map(({ label }) => unescapeZkLabel(label))
    throw new Error(
      `AEAT: combo item '${needle}' not found among ${JSON.stringify(sample)}`,
    )
  }
  return found.uuid
}
