/** The portal's answer for one document: the status, and on 200 the base64 content and file name. */
export type NotificationFileResponse = {
  readonly status: number
  readonly content?: string | undefined
  readonly name?: string | undefined
}
