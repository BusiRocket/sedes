import { emitSocialSecurityNumber } from '../../tgss/affiliation/emitSocialSecurityNumber'
import type { Command } from '../types/Command'

export const tgssNss: Command = {
  portal: 'tgss',
  action: 'nss',
  description:
    "Emit and download the holder's 'informe del número de la Seguridad Social' (NSS/NAF) at the Seguridad Social",
  options: [],
  run: async (client, options): Promise<unknown> =>
    emitSocialSecurityNumber(client, options['out']),
}
