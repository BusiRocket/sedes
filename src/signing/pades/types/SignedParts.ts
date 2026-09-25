/** What a PDF signature covers and carries: the signed bytes, the CMS and the /ByteRange. */
export type SignedParts = {
  readonly content: Buffer
  readonly cms: Buffer
  readonly byteRange: readonly number[]
}
