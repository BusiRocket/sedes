/**
 * Whether a DEHU item is a formal notification, where comparecencia applies,
 * or a plain communication. DEHU's JSON does not expose this distinction, so
 * nothing sets it yet; it stays here for when a source that does exists.
 */
export type NotificationKind = 'notification' | 'communication'
