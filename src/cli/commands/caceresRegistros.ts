import { listStaRegistrations } from '../../sta/listStaRegistrations'
import type { Command } from '../types/Command'

/** `ventanilla-unica caceres registros`: registry entries filed by or for the holder. */
export const caceresRegistros: Command = {
  portal: 'caceres',
  action: 'registros',
  description:
    'List the registry entries (anotaciones) filed by or on behalf of the holder at the Ayuntamiento de Cáceres sede (sede.caceres.es)',
  options: [],
  run: async (client): Promise<unknown> =>
    listStaRegistrations(client, 'caceres'),
}
