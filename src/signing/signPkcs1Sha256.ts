import { createPrivateKey, sign } from 'node:crypto'

import type { CertificateIdentity } from '../certificate/types/CertificateIdentity'

/**
 * RSA PKCS#1 v1.5 signature with SHA-256 over `data`, with the holder's key:
 * the primitive every signature format here ends in (CMS, XAdES, the TGSS
 * "firma optimizada" of a server-prepared hash).
 */
export const signPkcs1Sha256 = (
  identity: CertificateIdentity,
  data: Buffer,
): Buffer => {
  const key = createPrivateKey({
    key: identity.key,
    ...(identity.passphrase === undefined
      ? {}
      : { passphrase: identity.passphrase }),
  })
  return sign('sha256', data, key)
}
