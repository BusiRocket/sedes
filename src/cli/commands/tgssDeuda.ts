import { readTgssDebt } from '../../tgss/readTgssDebt'
import type { Command } from '../Command'

/** `sedes tgss deuda --nif <NIF> [--out <dir>]`: emit and read the TGSS "informe de deuda exigible". */
export const tgssDeuda: Command = {
  portal: 'tgss',
  action: 'deuda',
  description:
    "Emit and read the 'informe de deuda exigible' at the Seguridad Social (one emission per subject and day)",
  options: ['nif'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    return readTgssDebt(client, nif, options['out'])
  },
}
