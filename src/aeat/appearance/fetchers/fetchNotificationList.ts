import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'
import { formatDashDate } from '../formatters/formatDashDate'
import type { NotificationFilter } from '../types/NotificationFilter'

/**
 * POST SvInteresadosQuery: the AEAT sede's own notification list. A query,
 * not a comparecencia: listing opens nothing and starts no deadline.
 */
export const fetchNotificationList = async (
  client: HttpClient,
  filter: NotificationFilter,
): Promise<string> => {
  const readFlags = { unread: '0', read: '1', all: '' } as const
  const response = await client.request(
    `${aeatBaseUrl}/wlpl/GNNO-JDIT/SvInteresadosQuery`,
    {
      method: 'POST',
      form: {
        F_FECHA_DESDE: formatDashDate(filter.from),
        F_FECHA_HASTA: formatDashDate(filter.to),
        F_LEIDA: readFlags[filter.read],
        VEZ: 'BUSCAR1',
        QUE_MODO: 'NORMAL',
        NOM_QUERY:
          'es.aeat.gnno.jdit.web.punSede.interesados.query.SvInteresadosQuery',
        CLASGTE: '20/0/',
      },
      defaultCharset: 'iso-8859-15',
    },
  )
  if (response.status !== 200)
    throw new Error(
      `AEAT: notification list answered HTTP ${String(response.status)}`,
    )
  return response.text
}
