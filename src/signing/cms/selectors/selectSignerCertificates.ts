import { createPrivateKey, X509Certificate } from 'node:crypto'

import type { CertificateIdentity } from '../../../certificate/types/CertificateIdentity'
import { readPemCertificates } from '../parsers/readPemCertificates'
import type { SignerCertificates } from '../types/SignerCertificates'

/** Split the holder's PEM into the certificate of their key and the chain beside it. */
export const selectSignerCertificates = (
  identity: CertificateIdentity,
): SignerCertificates => {
  const key = createPrivateKey({
    key: identity.key,
    ...(identity.passphrase === undefined
      ? {}
      : { passphrase: identity.passphrase }),
  })
  const all = readPemCertificates(identity.cert)
  const signer = all.find((der) =>
    new X509Certificate(der).checkPrivateKey(key),
  )
  if (!signer)
    throw new Error('no certificate in the PEM matches the private key')
  return { signer, chain: all.filter((der) => der !== signer) }
}
