/** Which notifications the AEAT sede lists: unread, read or both, issued between two dates. */
export type NotificationFilter = {
  readonly read: 'unread' | 'read' | 'all'
  readonly from: Date
  readonly to: Date
}
