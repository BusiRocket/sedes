/** A live TGSS Prosa session: the rotating ticket, the app session id, and the last XML payload. */
export type ProsaSession = {
  readonly ticket: string
  readonly sessionId: string
  readonly xml: string
}
