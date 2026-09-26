import { listJuntaRepresentedExpedientes } from '../../gobex/listJuntaRepresentedExpedientes'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta representados`: expedientes with a representative at the Junta. */
export const juntaRepresentados: Command = {
  portal: 'junta',
  action: 'representados',
  description:
    'List the Junta de Extremadura expedientes handled through a representative ("Expedientes representados"), every state',
  options: [],
  run: async (client): Promise<unknown> =>
    listJuntaRepresentedExpedientes(client),
}
