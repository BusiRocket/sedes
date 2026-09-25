import { validateNif } from '../../tools/nif/validators/validateNif'
import type { Command } from '../types/Command'

export const validarNif: Command = {
  portal: 'validar',
  action: 'nif',
  description:
    'Check the shape and control character of a DNI, NIE, K/L/M NIF or entity NIF offline, with no certificate and no portal',
  options: ['nif'],
  needsCertificate: false,
  run: async (_client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    return Promise.resolve(validateNif(nif))
  },
}
