import { dniControlLetter } from '../mappers/dniControlLetter'
import type { NifKind } from '../types/NifKind'

/**
 * Why a DNI, NIE or K/L/M NIF is invalid, or undefined when its control letter
 * matches. The NIE replaces X, Y and Z by 0, 1 and 2; K, L and M take the DNI
 * letter of their 7 digits.
 */
export const checkPersonNif = (
  nif: string,
  kind: NifKind,
): string | undefined => {
  const nieDigits: Readonly<Record<string, string>> = { X: '0', Y: '1', Z: '2' }
  const lastIndex = 8
  const body =
    kind === 'dni'
      ? nif.slice(0, lastIndex)
      : kind === 'nie'
        ? `${nieDigits[nif.charAt(0)] ?? ''}${nif.slice(1, lastIndex)}`
        : nif.slice(1, lastIndex)
  const expected = dniControlLetter(body)
  const actual = nif.charAt(lastIndex)
  return actual === expected
    ? undefined
    : `control letter ${actual} does not match the expected ${expected}`
}
