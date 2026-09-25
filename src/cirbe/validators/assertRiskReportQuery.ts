import type { RiskReportQuery } from '../types/RiskReportQuery'
import { isCirbeBirthDate } from './isCirbeBirthDate'

/** Refuse a query the portal would reject before any request is made. */
export const assertRiskReportQuery = (query: RiskReportQuery): void => {
  if (!isCirbeBirthDate(query.birthDate))
    throw new Error('--nacimiento must be the date of birth as dd-mm-aaaa')
  const [local, domain, ...rest] = query.email.split('@')
  const looksLikeEmail =
    rest.length === 0 &&
    Boolean(local) &&
    (domain ?? '').includes('.') &&
    !/\s/.test(query.email)
  if (!looksLikeEmail) throw new Error('--email must be an e-mail address')
}
