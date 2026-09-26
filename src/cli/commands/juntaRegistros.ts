import { listStaRegistrations } from '../../sta/listStaRegistrations'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta registros`: registry entries filed by or for the holder. */
export const juntaRegistros: Command = {
  portal: 'junta',
  action: 'registros',
  description:
    'List the registry entries (anotaciones) filed by or on behalf of the holder at the Junta de Extremadura sede asociada (tramites.juntaex.es)',
  options: [],
  run: async (client): Promise<unknown> =>
    listStaRegistrations(client, 'junta'),
}
