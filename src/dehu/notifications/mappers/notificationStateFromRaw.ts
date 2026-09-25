import type { NotificationState } from '../types/NotificationState'

/**
 * Map DEHU's own realized-notification state to the listing's normalized one.
 * An unknown value becomes `other` rather than an error: one unexpected row
 * must not hide the whole listing, and the raw value stays on the item.
 */
export const notificationStateFromRaw = (
  raw: string | undefined,
): NotificationState => {
  if (raw === 'ACEPTADA') return 'compareced'
  if (raw === 'EXPIRADA') return 'expired'
  if (raw === 'RECHAZADA') return 'rejected'
  if (raw === 'REALIZADA_TEU') return 'edict'
  return 'other'
}
