import { findBalancedArrayEnd } from '../../html/parsers/findBalancedArrayEnd'
import type { StaDatasets } from '../types/StaDatasets'
import type { StaRow } from '../types/StaRow'

/**
 * Every `var ds_<NAME> = [...]` array an STA page or tab answer embeds. A
 * tab with no rows omits its script, which leaves its name absent.
 */
export const extractStaDatasets = (text: string): StaDatasets => {
  const datasets: Record<string, readonly StaRow[]> = {}
  for (const match of text.matchAll(/var ds_(\w+) = /g)) {
    const start = match.index + match[0].length
    const end = findBalancedArrayEnd(text, start)
    if (end === -1) continue
    const parsed: unknown = JSON.parse(text.slice(start, end + 1))
    if (Array.isArray(parsed))
      datasets[match[1] ?? ''] = parsed.filter(
        (row): row is StaRow => typeof row === 'object' && row !== null,
      )
  }
  return datasets
}
