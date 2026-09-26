import { listJuntaCarpetaNotifications } from '../../gobex/listJuntaCarpetaNotifications'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta carpeta-notificaciones`: notifications in the Junta's Carpeta Ciudadana. */
export const juntaCarpetaNotificaciones: Command = {
  portal: 'junta',
  action: 'carpeta-notificaciones',
  description:
    'List the notifications in the Junta de Extremadura Carpeta Ciudadana, every state, without opening any',
  options: [],
  run: async (client): Promise<unknown> =>
    listJuntaCarpetaNotifications(client),
}
