/** What the portal answers once an aplazamiento is signed and registered. */
export type DeferralReceipt = {
  readonly registryNumber: string
  readonly registeredAt: string
  readonly justificantePath?: string | undefined
}
