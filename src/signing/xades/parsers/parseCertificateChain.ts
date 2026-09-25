import { X509Certificate } from 'node:crypto'

import type { SignerCertificate } from '../types/SignerCertificate'

/** Every certificate of a PEM bundle, in order; the first is the signer's. */
export const parseCertificateChain = (pem: Buffer): SignerCertificate => {
  const blocks =
    pem
      .toString('latin1')
      .match(
        /-----BEGIN CERTIFICATE-----[\s\w+/=]+-----END CERTIFICATE-----/g,
      ) ?? []
  const chain = blocks.map((block) => new X509Certificate(block))
  const signer = chain[0]
  if (signer === undefined)
    throw new Error('the identity carries no PEM certificate')
  return { signer, chain }
}
