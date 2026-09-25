import { emitEmploymentAtDate } from '../../tgss/affiliation/emitEmploymentAtDate'
import type { Command } from '../types/Command'

export const tgssAlta: Command = {
  portal: 'tgss',
  action: 'alta',
  description:
    "Emit and download the holder's 'informe de alta laboral a fecha concreta' at the Seguridad Social",
  options: ['fecha'],
  run: async (client, options): Promise<unknown> => {
    const fecha = options['fecha']
    if (!fecha) throw new Error('--fecha is required (DD/MM/AAAA)')
    return emitEmploymentAtDate(client, fecha, options['out'])
  },
}
