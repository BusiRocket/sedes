import { dniControlLetters } from '../dniControlLetters'

/** The DNI control letter of a number: the letter at `number mod 23`. */
export const dniControlLetter = (digits: string): string => {
  const modulus = 23
  return dniControlLetters.charAt(Number(digits) % modulus)
}
