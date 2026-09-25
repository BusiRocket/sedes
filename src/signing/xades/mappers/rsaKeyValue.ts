import type { X509Certificate } from 'node:crypto'

import type { RsaKeyValue } from '../types/RsaKeyValue'

/** The RSA modulus and exponent of the certificate's public key, base64. */
export const rsaKeyValue = (certificate: X509Certificate): RsaKeyValue => {
  const jwk = certificate.publicKey.export({ format: 'jwk' })
  if (jwk.kty !== 'RSA' || jwk.n === undefined || jwk.e === undefined)
    throw new Error('only RSA certificates are supported')
  return {
    modulus: Buffer.from(jwk.n, 'base64url').toString('base64'),
    exponent: Buffer.from(jwk.e, 'base64url').toString('base64'),
  }
}
