import { euroAmountText } from '../mappers/euroAmountText'
import type { AmountToday } from '../types/AmountToday'
import { parseEuroAmount } from './parseEuroAmount'

/**
 * Read the JSON a `CALCULAR_IMP` post answers: `{ result: true, data: {...} }`
 * with the row's amounts as numbers (`importeActual` is today's total, the
 * one the tooltip shows as "Importe Total"). Anything that is not that
 * shape, or a `result: false`, answers undefined rather than a zeroed breakdown.
 */
export const parseAmountToday = (text: string): AmountToday | undefined => {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return undefined
  }
  if (typeof parsed !== 'object' || parsed === null) return undefined
  const answer = parsed as Readonly<Record<string, unknown>>
  const data = answer['data']
  if (answer['result'] !== true || typeof data !== 'object' || data === null)
    return undefined
  const record = data as Readonly<Record<string, unknown>>
  if (record['importeActual'] === undefined) return undefined
  const total = parseEuroAmount(record['importeActual'])
  return {
    principal: parseEuroAmount(record['importePrincipal']),
    surcharge: parseEuroAmount(record['importeRecargo']),
    interest: parseEuroAmount(record['importeIntereses']),
    costs: parseEuroAmount(record['importeCostas']),
    total,
    totalText: euroAmountText(total),
  }
}
