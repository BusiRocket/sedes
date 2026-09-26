import { listJuntaDebts } from '../../gobex/listJuntaDebts'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta deudas`: debts with the Junta de Extremadura, through Cl@ve. */
export const juntaDeudas: Command = {
  portal: 'junta',
  action: 'deudas',
  description:
    "List the holder's debts with the Junta de Extremadura (Carpeta Ciudadana, sede.gobex.es), every state",
  options: [],
  run: async (client): Promise<unknown> => listJuntaDebts(client),
}
