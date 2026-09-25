import { generatePaymentLetter } from '../../aeat/paymentLetter/generatePaymentLetter'
import { isEuroAmountText } from '../../aeat/paymentLetter/validators/isEuroAmountText'
import { isLiquidationKey } from '../../aeat/paymentLetter/validators/isLiquidationKey'
import { isConfirmed } from '../../write/isConfirmed'
import type { Command } from '../types/Command'

export const aeatCartaPago: Command = {
  portal: 'aeat',
  action: 'carta-pago',
  description:
    'Generate a modelo 010 carta de pago for part or all of one AEAT debt (--clave, --importe n,nn). Without --confirmar si it reads the debt and plans; confirmed, it mints a justificante and saves the PDF with --out. Generating pays nothing: the debt is paid only when a bank returns an NRC for it',
  options: ['nif', 'clave', 'importe'],
  effect: 'write',
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    const clave = options['clave']
    const importe = options['importe']
    if (!nif) throw new Error('--nif is required')
    if (!clave || !isLiquidationKey(clave))
      throw new Error(
        '--clave must be a liquidación key as the debt list prints it',
      )
    if (!importe || !isEuroAmountText(importe))
      throw new Error('--importe must be an amount like 1234,56 or 1.234,56')
    return generatePaymentLetter(client, {
      nif,
      clave,
      importe,
      outDir: options['out'],
      confirm: isConfirmed(options),
    })
  },
}
