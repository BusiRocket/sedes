import type { HttpClient } from '../../http/types/HttpClient'
import { mapGridRow } from '../mappers/mapGridRow'
import { mapOtherGrids } from '../mappers/mapOtherGrids'
import { parseGrids } from '../parsers/parseGrids'
import { selectDatascroller } from '../selectors/selectDatascroller'
import { selectImageButtonForm } from '../selectors/selectImageButtonForm'
import type { GobexSearch } from '../types/GobexSearch'
import { collectScrollerRows } from './collectScrollerRows'
import { submitImageButton } from './submitImageButton'

/**
 * Run one Carpeta Ciudadana search and collect every page of its grid (the
 * one inside the search form). A page number past the end answers the first
 * page again, so the walk stops on the first row already seen. Other grids
 * on the page (a modal of incidents) are returned as they are.
 */
export const searchGobexReport = async (
  client: HttpClient,
  url: string,
  filters: (formId: string) => Readonly<Record<string, string>> = () => ({}),
): Promise<GobexSearch> => {
  const page = await client.request(url)
  const fields = selectImageButtonForm(page.text, page.url, 'bt_buscar')?.form
    .fields
  const formId = Object.keys(fields ?? {}).find((key) => !key.includes(':'))
  if (formId === undefined)
    throw new Error(`Junta: no search form at ${page.url}`)
  const results = await submitImageButton(
    client,
    page,
    'bt_buscar',
    filters(formId),
  )
  if (results.status >= 500)
    throw new Error(
      `Junta: the sede answered ${String(results.status)} to the search at ${url}; the error is on its side`,
    )
  const grids = parseGrids(results.text)
  const main = grids.find((grid) => grid.id.startsWith(`${formId}:`))
  if (!main)
    throw new Error(`Junta: the search at ${url} answered no result grid`)
  const scroller = selectDatascroller(results.text, formId)
  const rows = scroller
    ? await collectScrollerRows(client, results, scroller, main)
    : main.rows
  return {
    rows: rows.map((cells) => mapGridRow(main.headers, cells)),
    otherGrids: mapOtherGrids(grids, main),
  }
}
