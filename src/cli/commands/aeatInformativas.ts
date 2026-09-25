import { listAeatInformatives } from '../../aeat/informatives/listAeatInformatives'
import type { Command } from '../types/Command'

export const aeatInformativas: Command = {
  portal: 'aeat',
  action: 'informativas',
  description:
    'Informativas filed at the Agencia Tributaria for one modelo and ejercicio (2020 onwards), with the CSV of each receipt and the PDFs when --out is given',
  options: ['nif', 'modelo', 'ejercicio'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    const modelo = options['modelo']
    const ejercicio = options['ejercicio']
    if (!nif) throw new Error('--nif is required')
    if (!modelo || !ejercicio)
      throw new Error('--modelo and --ejercicio are required')
    return listAeatInformatives(
      client,
      nif,
      { modelo, ejercicio },
      options['out'],
    )
  },
}
