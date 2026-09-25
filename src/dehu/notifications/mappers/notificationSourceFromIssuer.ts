import type { NotificationSource } from '../types/NotificationSource'

/**
 * Guess the issuing administration family from the emitter's name. Order
 * matters: OARGT's own name ends in "Recaudacion y Gestion Tributaria", so it
 * is matched before the generic AEAT "Tributaria" pattern, not after.
 */
export const notificationSourceFromIssuer = (
  issuer: string,
): NotificationSource => {
  if (/Tesoreria|Seguridad Social/i.test(issuer)) return 'tgss'
  if (/Recaudacion y Gestion Tributaria/i.test(issuer)) return 'oargt'
  if (/Tributaria/i.test(issuer)) return 'aeat'
  if (/Ayuntamiento/i.test(issuer)) return 'ayto'
  return 'other'
}
