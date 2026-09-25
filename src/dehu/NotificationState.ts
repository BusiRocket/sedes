/**
 * A notification's own status at DEHU: newly available, already opened, expired
 * unopened, rejected, or served by edict (`REALIZADA_TEU`, the Tablon Edictal
 * Unico). `other` keeps a state this listing has not seen yet; the raw value
 * travels next to it.
 */
export type NotificationState =
  'pending' | 'compareced' | 'expired' | 'rejected' | 'edict' | 'other'
