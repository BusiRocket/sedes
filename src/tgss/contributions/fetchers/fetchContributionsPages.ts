import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchProsaAction } from '../../prosa/fetchers/fetchProsaAction'
import type { ProsaSession } from '../../session/types/ProsaSession'
import { parseContributionsPage } from '../parsers/parseContributionsPage'
import type { ContributionsPage } from '../types/ContributionsPage'
import type { ContributionsPages } from '../types/ContributionsPages'

/**
 * Select the year on the AESRCUS3 entry screen and walk its régimen pages
 * with `PAGINA_SIGUIENTE`. Reading pages emits nothing; the informe is a
 * separate button. The walk stops after `maxPages` even if the screen
 * still offers a next one.
 */
export const fetchContributionsPages = async (
  client: HttpClient,
  session: ProsaSession,
  ejercicio: string,
  maxPages = 20,
): Promise<ContributionsPages> => {
  const pages: ContributionsPage[] = []
  let current = session
  let payload = await fetchProsaAction(
    client,
    current,
    'AC_CONTINUAR_SELECCION_ANIO',
    { anio: ejercicio },
  )
  for (;;) {
    current = { ...current, ticket: payload.ticket, xml: payload.xml }
    const page = parseContributionsPage(payload.xml)
    pages.push(page)
    if (!page.hasNext || pages.length >= maxPages) break
    payload = await fetchProsaAction(client, current, 'PAGINA_SIGUIENTE')
  }
  return { pages, session: current }
}
