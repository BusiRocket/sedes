import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { parseTableRows } from '../parsers/parseTableRows'
import type { Datascroller } from '../types/Datascroller'
import type { GobexGrid } from '../types/GobexGrid'
import { fetchScrollerPage } from './fetchScrollerPage'

/**
 * Every row of `grid` across its scroller pages. A page number past the end
 * answers the first page again, so the walk stops on a page with no row not
 * already seen, and never goes past 50 pages.
 */
export const collectScrollerRows = async (
  client: HttpClient,
  results: HttpResponse,
  scroller: Datascroller,
  grid: GobexGrid,
): Promise<(readonly string[])[]> => {
  const rows = [...grid.rows]
  const seen = new Set(rows.map((cells) => cells.join('|')))
  for (let next = 2; next <= 50; next += 1) {
    const reply = await fetchScrollerPage(client, results, scroller, next)
    const fresh = parseTableRows(reply.text, grid.id).filter(
      (cells) => !seen.has(cells.join('|')),
    )
    if (fresh.length === 0) break
    for (const cells of fresh) seen.add(cells.join('|'))
    rows.push(...fresh)
  }
  return rows
}
