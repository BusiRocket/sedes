import { entityControlLetters } from '../entityControlLetters'
import { entityTypeLetters } from '../entityTypeLetters'
import { entityControlDigit } from '../mappers/entityControlDigit'

/**
 * Why an entity NIF is invalid, or undefined when its control character
 * matches the one its type letter requires: a letter, a digit, or either.
 */
export const checkEntityNif = (nif: string): string | undefined => {
  const lastIndex = 8
  const form = entityTypeLetters[nif.charAt(0)] ?? 'cualquiera'
  const digit = entityControlDigit(nif.slice(1, lastIndex))
  const letter = entityControlLetters.charAt(digit)
  const actual = nif.charAt(lastIndex)
  const accepted = [
    ...(form === 'letra' ? [] : [String(digit)]),
    ...(form === 'digito' ? [] : [letter]),
  ]
  return accepted.includes(actual)
    ? undefined
    : `control character ${actual} does not match the expected ${accepted.join(' or ')}`
}
