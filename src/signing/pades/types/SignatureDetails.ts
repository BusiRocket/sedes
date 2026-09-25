/** What the signature says about itself: who, when, why and where. */
export type SignatureDetails = {
  readonly commonName: string
  readonly date: Date
  readonly reason?: string | undefined
  readonly location?: string | undefined
}
