import { parseTableRowCells } from '../../debts/parsers/parseTableRowCells'
import { informativeFromCells } from '../mappers/informativeFromCells'
import type { InformativeFiling } from '../types/InformativeFiling'

/** The expediente rows of `table#idtablaExped`; none when the table is absent. */
export const parseInformativeRows = (
  html: string,
): readonly InformativeFiling[] => {
  const table = /<table[^>]*\sid=['"]idtablaExped['"][\s\S]*?<\/table>/i.exec(
    html,
  )?.[0]
  if (!table) return []
  return parseTableRowCells(table)
    .map(informativeFromCells)
    .filter((filing) => filing !== undefined)
}
