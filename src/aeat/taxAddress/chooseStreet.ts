import { clickUuid } from './clickUuid'
import { dispatchM036Event } from './dispatchM036Event'
import { findAddressSearchButton } from './parsers/findAddressSearchButton'
import { findWidgetUuid } from './parsers/findWidgetUuid'
import { parseStreetItems } from './parsers/parseStreetItems'
import { typeIntoWidget } from './typeIntoWidget'
import type { M036Session } from './types/M036Session'
import type { TaxAddressRequest } from './types/TaxAddressRequest'

/** Pick the street through the 036 finder: postcode, name filter, exactly one match. */
export const chooseStreet = async (
  session: M036Session,
  request: TaxAddressRequest,
): Promise<void> => {
  await clickUuid(session, findAddressSearchButton(session.html))
  await typeIntoWidget(session, 'codigoPostal', request.codigoPostal)
  await clickUuid(
    session,
    findWidgetUuid(session.blobs, 'botonBuscarCodPostal'),
  )
  const items = parseStreetItems(
    await typeIntoWidget(session, 'nombreViaFiltro', request.via),
  )
  const [item] = items
  if (items.length !== 1 || !item)
    throw new Error(
      `AEAT: --via "${request.via}" matched ${String(items.length)} streets in ${request.codigoPostal}; it must match exactly one`,
    )
  await dispatchM036Event(session, {
    cmd: 'onSelect',
    uuid: findWidgetUuid(session.blobs, 'listadoViasBuscador'),
    data: {
      items: [item],
      reference: item,
      clearFirst: false,
      selectAll: false,
    },
  })
  await clickUuid(session, findWidgetUuid(session.blobs, 'botonSeleccionar'))
}
