import { readTgssDebt } from '../../tgss/debt/readTgssDebt'
import { validateDebtReportKind } from '../../tgss/debt/validators/validateDebtReportKind'
import type { Command } from '../types/Command'

/** `papeleo tgss deuda --nif <NIF> [--tipo detallado|total] [--out <dir>]`: emit and read the TGSS "informe de deuda exigible". */
export const tgssDeuda: Command = {
  portal: 'tgss',
  action: 'deuda',
  description:
    "Emit and read the 'informe de deuda exigible' at the Seguridad Social (--tipo detallado|total; each emission counts against the daily cap)",
  options: ['nif', 'tipo'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    const kind = validateDebtReportKind(options['tipo'])
    return readTgssDebt(client, nif, options['out'], kind)
  },
}
