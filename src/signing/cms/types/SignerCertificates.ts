/** The certificate that matches the holder's key and the rest of the bundle (its chain). */
export type SignerCertificates = {
  readonly signer: Buffer
  readonly chain: readonly Buffer[]
}
