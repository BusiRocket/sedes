import type { NotificationState } from './NotificationState'

/** Map DEHU's own realized-notification state to the listing's normalized one. */
export const notificationStateFromRaw = (
  raw: string | undefined,
): NotificationState => {
  if (raw === 'ACEPTADA') return 'compareced'
  if (raw === 'EXPIRADA') return 'expired'
  if (raw === 'RECHAZADA') return 'rejected'
  throw new Error(
    `DEHU: unrecognized realized notification state "${String(raw)}"`,
  )
}
