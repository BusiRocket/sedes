import { listOargtReceipts } from '../../oargt/receipts/listOargtReceipts'
import type { Command } from '../types/Command'

/** `ventanilla-unica oargt recibos [--include paid] [--importes yes]`: the OARGT (Diputación de Cáceres) receipt lists. */
export const oargtRecibos: Command = {
  portal: 'oargt',
  action: 'recibos',
  description:
    "List receipts in voluntary and enforced collection (and optionally paid ones) at OARGT Caceres; --importes adds today's amount per enforced receipt",
  options: ['include', 'importes'],
  run: async (client, options) =>
    listOargtReceipts(client, {
      includePaid: options['include'] === 'paid',
      includeAmountToday: options['importes'] !== undefined,
    }),
}
