import { requestDeferral } from '../../tgss/deferral/requestDeferral'
import { validateDeferralQuery } from '../../tgss/deferral/validators/validateDeferralQuery'
import { isConfirmed } from '../../write/isConfirmed'
import type { Command } from '../types/Command'

export const tgssAplazamiento: Command = {
  portal: 'tgss',
  action: 'aplazamiento',
  description:
    'Plan an aplazamiento of Seguridad Social debt (XV207A01) with a guarantee exemption and the SEPA mandate PDF; --confirmar si to submit',
  options: ['nif', 'plazos', 'garantia', 'documento'],
  effect: 'write',
  run: async (_client, options): Promise<unknown> =>
    requestDeferral(validateDeferralQuery(options), isConfirmed(options)),
}
