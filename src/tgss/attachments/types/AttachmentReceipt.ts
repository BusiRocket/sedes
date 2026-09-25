/** What the portal answers once a CEUS document is signed and attached. */
export type AttachmentReceipt = {
  readonly justificante: string
  readonly justificantePath?: string | undefined
}
