import { listJuntaDocuments } from '../../gobex/listJuntaDocuments'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta documentos`: documents filed with the Junta de Extremadura. */
export const juntaDocumentos: Command = {
  portal: 'junta',
  action: 'documentos',
  description:
    'List the documents the holder filed with the Junta de Extremadura ("Mis documentos")',
  options: [],
  run: async (client): Promise<unknown> => listJuntaDocuments(client),
}
