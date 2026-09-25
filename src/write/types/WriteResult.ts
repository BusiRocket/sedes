/**
 * The answer of every write command. Without confirmation `executed` is false,
 * every read-only preparation step has run, and `plan` says what the final
 * request would do; with confirmation `receipt` carries what the portal answered
 * (registry number, CSV, justificante path).
 */
export type WriteResult<Receipt> = {
  readonly action: string
  readonly executed: boolean
  readonly plan: readonly string[]
  readonly receipt?: Receipt | undefined
  readonly notes: readonly string[]
}
