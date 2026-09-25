import type { X509Certificate } from 'node:crypto'

/** The signing certificate and the rest of the chain found in the identity PEM. */
export type SignerCertificate = {
  readonly signer: X509Certificate
  /** Every certificate in PEM order, the signer first. */
  readonly chain: readonly X509Certificate[]
}
