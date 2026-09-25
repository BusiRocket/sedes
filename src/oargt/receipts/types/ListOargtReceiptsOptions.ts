/** What `listOargtReceipts` may fetch beyond the voluntaria and ejecutiva tabs. */
export type ListOargtReceiptsOptions = {
  readonly includePaid: boolean
  /** Ask the portal for each enforced receipt's amount today (one request per receipt). */
  readonly includeAmountToday?: boolean | undefined
}
