import { listStaExpedientes } from '../../sta/listStaExpedientes'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta expedientes`: open and archived expedientes. */
export const juntaExpedientes: Command = {
  portal: 'junta',
  action: 'expedientes',
  description:
    "List the holder's open and archived expedientes at the Junta de Extremadura sede asociada (tramites.juntaex.es)",
  options: [],
  run: async (client): Promise<unknown> => listStaExpedientes(client, 'junta'),
}
