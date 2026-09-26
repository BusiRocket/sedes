import type { StaRole } from './StaRole'

/** One notification from the STA "Mis notificaciones" page. */
export type StaNotification = {
  readonly role: StaRole
  readonly tab: string
  readonly reference: string
  readonly expediente: string
  readonly subject: string
  readonly action: string
  readonly status: string
  readonly madeAvailableAt: string
  readonly resolvedAt: string
  readonly recipient: string
}
