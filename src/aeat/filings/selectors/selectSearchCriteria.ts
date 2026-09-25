import type { HttpClient } from '../../../http/types/HttpClient'
import { postZkEvent } from '../fetchers/postZkEvent'
import { zkSelectData } from '../mappers/zkSelectData'
import { parseComboItems } from '../parsers/parseComboItems'
import type { FilingsQuery } from '../types/FilingsQuery'
import type { ZkDesktop } from '../types/ZkDesktop'
import { selectComboItem } from './selectComboItem'

/**
 * Select modelo, then ejercicio, then periodo only when asked. Each select
 * reloads the next combo, so its items come from the previous response and
 * fall back to the page. An empty periodo returns every period of the year.
 */
export const selectSearchCriteria = async (
  client: HttpClient,
  html: string,
  desktop: ZkDesktop,
  query: FilingsQuery,
): Promise<void> => {
  const select = async (uuid: string, itemUuid: string): Promise<string> =>
    postZkEvent(client, desktop.desktopId, {
      cmd: 'onSelect',
      uuid,
      data: zkSelectData(itemUuid),
    })
  const itemsOf = (response: string, combo: string) => {
    const reloaded = parseComboItems(response)
    return reloaded.length > 0 ? reloaded : parseComboItems(html, combo)
  }
  const afterModelo = await select(
    desktop.comboModelos,
    selectComboItem(parseComboItems(html, desktop.comboModelos), query.modelo),
  )
  const afterEjercicio = await select(
    desktop.comboEjercicios,
    selectComboItem(
      itemsOf(afterModelo, desktop.comboEjercicios),
      query.ejercicio,
    ),
  )
  if (query.periodo === undefined || query.periodo === '') return
  await select(
    desktop.comboPeriodos,
    selectComboItem(
      itemsOf(afterEjercicio, desktop.comboPeriodos),
      query.periodo,
    ),
  )
}
