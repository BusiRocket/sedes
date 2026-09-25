import { emitIdentityData } from '../../tgss/affiliation/emitIdentityData'
import type { Command } from '../types/Command'

export const tgssDatos: Command = {
  portal: 'tgss',
  action: 'datos',
  description:
    "Emit and download the holder's 'informe de datos identificativos y de domicilio' at the Seguridad Social",
  options: [],
  run: async (client, options): Promise<unknown> =>
    emitIdentityData(client, options['out']),
}
