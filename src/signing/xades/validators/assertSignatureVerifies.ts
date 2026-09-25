import type { X509Certificate } from 'node:crypto'
import { verify } from 'node:crypto'

/** Fail when the key that signed does not belong to the certificate the signature names. */
export const assertSignatureVerifies = (
  certificate: X509Certificate,
  data: Buffer,
  signature: Buffer,
): void => {
  if (!verify('sha256', data, certificate.publicKey, signature))
    throw new Error('the private key does not match the signing certificate')
}
