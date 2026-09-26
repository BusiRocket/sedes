import { listStaNotifications } from '../../sta/listStaNotifications'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta notificaciones`: pending, accepted and rejected notifications, without opening any. */
export const juntaNotificaciones: Command = {
  portal: 'junta',
  action: 'notificaciones',
  description:
    'List pending, accepted and rejected notifications at the Junta de Extremadura sede asociada (tramites.juntaex.es), as interested party and as representative, without opening any',
  options: [],
  run: async (client): Promise<unknown> =>
    listStaNotifications(client, 'junta'),
}
