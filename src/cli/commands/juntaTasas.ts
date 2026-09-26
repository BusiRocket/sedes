import { listJuntaFees } from '../../gobex/listJuntaFees'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta tasas`: paid fees and payment incidents at the Junta de Extremadura. */
export const juntaTasas: Command = {
  portal: 'junta',
  action: 'tasas',
  description:
    "List the holder's paid Junta de Extremadura fees (tasas) and their payment incidents (Carpeta Ciudadana, sede.gobex.es)",
  options: [],
  run: async (client): Promise<unknown> => listJuntaFees(client),
}
