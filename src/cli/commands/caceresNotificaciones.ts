import { listStaNotifications } from '../../sta/listStaNotifications'
import type { Command } from '../types/Command'

/** `ventanilla-unica caceres notificaciones`: pending, accepted and rejected notifications, without opening any. */
export const caceresNotificaciones: Command = {
  portal: 'caceres',
  action: 'notificaciones',
  description:
    'List pending, accepted and rejected notifications at the Ayuntamiento de Cáceres sede (sede.caceres.es), as interested party and as representative, without opening any',
  options: [],
  run: async (client): Promise<unknown> =>
    listStaNotifications(client, 'caceres'),
}
