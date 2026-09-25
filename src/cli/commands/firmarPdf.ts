import { signPdfFile } from '../../signing/pades/signPdfFile'
import type { Command } from '../types/Command'

export const firmarPdf: Command = {
  portal: 'firmar',
  action: 'pdf',
  description:
    'Sign a PDF locally with the certificate (PAdES-B-B, incremental update): --in <file> --out <file> [--visible si] [--motivo <text>]',
  options: ['in', 'visible', 'motivo'],
  effect: 'sign',
  run: async (_client, options, identity): Promise<unknown> => {
    const { in: input, out: output } = options
    if (!input || !output) throw new Error('--in and --out are required')
    if (!identity)
      throw new Error('firmar pdf needs the certificate: --cert and --key')
    return signPdfFile(identity, {
      input,
      output,
      options: {
        visible: options['visible'] === 'si',
        reason: options['motivo'],
      },
    })
  },
}
