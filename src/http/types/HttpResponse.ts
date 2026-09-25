/** One HTTP exchange as the portal clients consume it: status, headers, final URL and the decoded body. */
export type HttpResponse = {
  readonly status: number
  readonly url: string
  readonly headers: Readonly<Record<string, string | string[] | undefined>>
  readonly body: Buffer
  /** The body decoded with the charset the response declared, or the client's default. */
  readonly text: string
}
