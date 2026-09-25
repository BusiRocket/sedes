import type { CertificateParts } from '../../asn1/types/CertificateParts'

/** What one SignerInfo is made of. */
export type SignerInfoParts = {
  readonly signer: CertificateParts
  /** The signed attributes, each an encoded Attribute. */
  readonly attributes: readonly Buffer[]
  /** PKCS#1 v1.5 signature over the attributes' DER SET OF encoding. */
  readonly signature: Buffer
}
