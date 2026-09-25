import type { LetterStepInput } from '../types/LetterStepInput'
import { parsePuvToken } from './parsePuvToken'

/** The next step's input from the page that precedes it; a page without `pUV` ends the chain. */
export const readStepInput = (
  html: string,
  nif: string,
  clave: string,
): LetterStepInput => {
  const puv = parsePuvToken(html)
  if (!puv)
    throw new Error(
      `AEAT: the payment chain for ${clave} stopped on a page without a pUV token`,
    )
  return { nif, clave, puv }
}
