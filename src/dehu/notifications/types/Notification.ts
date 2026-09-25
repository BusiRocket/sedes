import type { NotificationKind } from './NotificationKind'
import type { NotificationSource } from './NotificationSource'
import type { NotificationState } from './NotificationState'

/** One DEHU notification or communication, normalized for listing. Never carries what opening it would need. */
export type Notification = {
  readonly id: string
  /** DEHU's sent reference, the key its realized documents are read by. */
  readonly reference?: string | undefined
  readonly subject: string
  readonly issuer: string
  readonly holderNif?: string | undefined
  readonly holderName?: string | undefined
  readonly createdAt: string
  readonly expiresAt?: string | undefined
  readonly state: NotificationState
  /** The portal's own state value, for states the listing folds into `other`. */
  readonly rawState?: string | undefined
  readonly kind?: NotificationKind | undefined
  readonly source?: NotificationSource | undefined
}
