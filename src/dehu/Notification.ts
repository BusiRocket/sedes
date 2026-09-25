import type { NotificationKind } from './NotificationKind'
import type { NotificationSource } from './NotificationSource'
import type { NotificationState } from './NotificationState'

/** One DEHU notification or communication, normalized for listing. Never carries what opening it would need. */
export type Notification = {
  readonly id: string
  readonly subject: string
  readonly issuer: string
  readonly holderNif?: string | undefined
  readonly holderName?: string | undefined
  readonly createdAt: string
  readonly expiresAt?: string | undefined
  readonly state: NotificationState
  readonly kind?: NotificationKind | undefined
  readonly source?: NotificationSource | undefined
}
