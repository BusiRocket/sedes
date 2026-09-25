/** What the 036 prints after presentation: its visible labels and any document links. */
export type TaxAddressReceipt = {
  readonly labels: readonly string[]
  readonly urls: readonly string[]
}
