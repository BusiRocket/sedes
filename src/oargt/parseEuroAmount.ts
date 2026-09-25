/**
 * Coerce one of the portal's amount fields into euros. `importePrincipal`
 * arrives as a JSON number; `importePendiente` arrives as a numeric string
 * with a dot decimal separator (`"318.48"`). Anything else answers zero
 * rather than `NaN`, since a receipt with an unreadable amount is still worth
 * listing.
 */
export const parseEuroAmount = (raw: unknown): number => {
  if (typeof raw === 'number') return raw
  if (typeof raw !== 'string') return 0
  const value = Number.parseFloat(raw.replace(',', '.'))
  return Number.isNaN(value) ? 0 : value
}
