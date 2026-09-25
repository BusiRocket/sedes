import type { Notification } from '../types/Notification'
import type { NotificationApiItem } from '../types/NotificationApiItem'
import type { NotificationState } from '../types/NotificationState'
import { notificationSourceFromIssuer } from './notificationSourceFromIssuer'

/** Map a validated raw API item to the listing's stable notification shape. */
export const toNotification = (
  item: NotificationApiItem,
  extra: {
    readonly state: NotificationState
    readonly rawState?: string | undefined
    readonly expiresAt?: string | undefined
  },
): Notification => ({
  id: item.identifier,
  subject: item.concept,
  issuer: item.emitterEntity,
  holderNif: item.nifTitular,
  holderName: undefined,
  createdAt: item.availabilityDate,
  expiresAt: extra.expiresAt,
  state: extra.state,
  rawState: extra.rawState,
  kind: undefined,
  source: notificationSourceFromIssuer(item.emitterEntity),
})
