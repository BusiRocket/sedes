import { attachToExpediente } from '../../tgss/attachments/attachToExpediente'
import { validateAttachmentQuery } from '../../tgss/attachments/validators/validateAttachmentQuery'
import { isConfirmed } from '../../write/isConfirmed'
import type { Command } from '../types/Command'

export const tgssAdjuntar: Command = {
  portal: 'tgss',
  action: 'adjuntar',
  description:
    'Plan attaching a PDF to a Seguridad Social expediente (CEUS, tipo 1006/1010/1008); --confirmar si to submit',
  options: ['expediente', 'documento', 'tipo'],
  effect: 'write',
  run: async (_client, options): Promise<unknown> =>
    attachToExpediente(validateAttachmentQuery(options), isConfirmed(options)),
}
