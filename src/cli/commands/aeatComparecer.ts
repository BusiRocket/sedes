import { appearAtNotification } from '../../aeat/appearance/appearAtNotification'
import { isNotificationId } from '../../aeat/appearance/validators/isNotificationId'
import { isConfirmed } from '../../write/isConfirmed'
import type { Command } from '../types/Command'

export const aeatComparecer: Command = {
  portal: 'aeat',
  action: 'comparecer',
  description:
    "Appear (comparecer) at a notification in the Agencia Tributaria's own sede. Without --confirmar si it only lists the pending notifications and plans; confirmed, it opens --id, which counts as notified today and STARTS every legal deadline the act carries, then saves the act and the acuse de recibo with --out",
  options: ['nif', 'id'],
  effect: 'write',
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    const ncc = options['id']
    const confirm = isConfirmed(options)
    if (!nif) throw new Error('--nif is required')
    if (ncc !== undefined && !isNotificationId(ncc))
      throw new Error(
        '--id must be the numeric notification id the list prints',
      )
    if (confirm && !ncc) throw new Error('--id is required with --confirmar si')
    return appearAtNotification(client, {
      nif,
      ncc,
      outDir: options['out'],
      confirm,
    })
  },
}
