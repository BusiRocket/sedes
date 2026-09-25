import { nifKindOf } from '../mappers/nifKindOf'
import { normalizeNif } from '../mappers/normalizeNif'
import type { NifValidation } from '../types/NifValidation'
import { checkEntityNif } from './checkEntityNif'
import { checkPersonNif } from './checkPersonNif'

/**
 * Validate a Spanish NIF, NIE or entity NIF offline: the shape first, then the
 * control character. Says nothing about whether the AEAT has it on its census.
 */
export const validateNif = (value: string): NifValidation => {
  const normalizado = normalizeNif(value)
  const tipo = nifKindOf(normalizado)
  const motivo =
    tipo === 'desconocido'
      ? 'the value has the shape of no Spanish tax identifier'
      : tipo === 'persona-juridica'
        ? checkEntityNif(normalizado)
        : checkPersonNif(normalizado, tipo)
  return motivo === undefined
    ? { valor: value, normalizado, tipo, valido: true }
    : { valor: value, normalizado, tipo, valido: false, motivo }
}
