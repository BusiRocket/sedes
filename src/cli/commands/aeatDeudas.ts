import { sweepAeatDebts } from '../../aeat/debts/sweepAeatDebts'
import type { Command } from '../types/Command'

/** `papeleo aeat deudas --nif <NIF>`: pending debts, detail and SRAF agreements. */
export const aeatDeudas: Command = {
  portal: 'aeat',
  action: 'deudas',
  description:
    'Pending debts, their detail and deferral agreements at the Agencia Tributaria',
  options: ['nif'],
  run: async (client, options) => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    return sweepAeatDebts(client, nif)
  },
}
