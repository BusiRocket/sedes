import type { HttpClient } from '../../http/types/HttpClient'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { sepeUrls } from '../session/sepeUrls'
import { mapRemainingDays } from './mappers/mapRemainingDays'
import { parseBenefitFields } from './parsers/parseBenefitFields'
import { parseMainText } from './parsers/parseMainText'
import type { LastBenefit } from './types/LastBenefit'

/**
 * Read the "última prestación" screen: the last recognised unemployment
 * right, rendered by the sede into readonly inputs, so the landed page is
 * the whole answer. The sede writes ISO-8859-1 whatever it declares. A
 * holder without a recognised right gets the screen's own message instead
 * of fields.
 */
export const readLastBenefit = async (
  client: HttpClient,
): Promise<LastBenefit> => {
  const landed = await loginWithCertificate(client, sepeUrls.lastBenefit)
  const page = landed.body.toString('latin1')
  const fields = parseBenefitFields(page)
  const notes = [
    'values are the screen inputs verbatim; diasRestantes is diasDerecho minus diasConsumidos',
  ]
  if (Object.keys(fields).length === 0)
    return { fields, message: parseMainText(page), notes }
  const diasRestantes = mapRemainingDays(fields)
  return diasRestantes === undefined
    ? { fields, notes }
    : { fields, diasRestantes, notes }
}
