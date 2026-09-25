import { emitWorkerSituation } from '../../tgss/affiliation/emitWorkerSituation'
import type { Command } from '../types/Command'

export const tgssSituacion: Command = {
  portal: 'tgss',
  action: 'situacion',
  description:
    "Emit and download the holder's 'informe de situación actual del trabajador' at the Seguridad Social",
  options: [],
  run: async (client, options): Promise<unknown> =>
    emitWorkerSituation(client, options['out']),
}
