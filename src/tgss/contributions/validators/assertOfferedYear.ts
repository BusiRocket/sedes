import { parseAvailableYears } from '../parsers/parseAvailableYears'
import { isYear } from './isYear'

/**
 * Refuse a year the AESRCUS3 screen does not offer, naming the range it
 * does. A screen without the select (never seen live) lets any year through.
 */
export const assertOfferedYear = (xml: string, ejercicio: string): void => {
  if (!isYear(ejercicio))
    throw new Error('TGSS: --ejercicio must be a year as AAAA')
  const years = parseAvailableYears(xml)
  if (years.length === 0 || years.includes(ejercicio)) return
  const range = `${years.at(-1) ?? ''}-${years[0] ?? ''}`
  throw new Error(`TGSS: ejercicio ${ejercicio} is not offered (${range})`)
}
