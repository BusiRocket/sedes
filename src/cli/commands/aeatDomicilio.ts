import { changeTaxAddress } from '../../aeat/taxAddress/changeTaxAddress'
import { isConfirmed } from '../../write/isConfirmed'
import type { Command } from '../types/Command'

export const aeatDomicilio: Command = {
  portal: 'aeat',
  action: 'domicilio',
  description:
    "File a modelo 036 change of fiscal address (casilla 122) for a legal entity. Without --confirmar si it validates the options and plans, sending nothing; confirmed, it fills, validates and files the 036, which changes the entity's fiscal address at the AEAT",
  options: [
    'nif',
    'codigo-postal',
    'via',
    'tipo-numero',
    'numero',
    'complemento',
    'referencia-catastral',
    'lugar',
    'firmado',
    'calidad',
  ],
  effect: 'write',
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    return changeTaxAddress(client, {
      nif,
      codigoPostal: options['codigo-postal'] ?? '',
      via: options['via'] ?? '',
      tipoNumero: options['tipo-numero'] ?? 'NUMERO',
      numero: options['numero'] ?? '',
      complemento: options['complemento'],
      referenciaCatastral: options['referencia-catastral'] ?? '',
      lugar: options['lugar'] ?? '',
      firmado: options['firmado'] ?? '',
      calidad: options['calidad'] ?? '',
      confirm: isConfirmed(options),
    })
  },
}
