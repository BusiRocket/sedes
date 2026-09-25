import { listAeatPayments } from '../../aeat/payments/listAeatPayments'
import type { Command } from '../types/Command'

export const aeatPagos: Command = {
  portal: 'aeat',
  action: 'pagos',
  description:
    'Payments made at the Agencia Tributaria (MisPagos), with their receipt PDFs when --out is given',
  options: ['nif'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    return listAeatPayments(client, nif, options['out'])
  },
}
