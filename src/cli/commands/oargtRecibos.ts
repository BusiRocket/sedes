import { listOargtReceipts } from '../../oargt/receipts/listOargtReceipts'
import type { Command } from '../types/Command'

/** `sedes oargt recibos [--include paid]`: the OARGT (Diputación de Cáceres) receipt lists. */
export const oargtRecibos: Command = {
  portal: 'oargt',
  action: 'recibos',
  description:
    'List receipts in voluntary and enforced collection (and optionally paid ones) at OARGT Caceres',
  options: ['include'],
  run: async (client, options) =>
    listOargtReceipts(client, { includePaid: options['include'] === 'paid' }),
}
