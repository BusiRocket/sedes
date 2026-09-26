import { listStaExpedientes } from '../../sta/listStaExpedientes'
import type { Command } from '../types/Command'

/** `ventanilla-unica caceres expedientes`: open and archived expedientes. */
export const caceresExpedientes: Command = {
  portal: 'caceres',
  action: 'expedientes',
  description:
    "List the holder's open and archived expedientes at the Ayuntamiento de Cáceres sede (sede.caceres.es)",
  options: [],
  run: async (client): Promise<unknown> =>
    listStaExpedientes(client, 'caceres'),
}
