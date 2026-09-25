import { X509Certificate } from 'node:crypto'

import type { CertificateIdentity } from '../../../certificate/types/CertificateIdentity'
import { selectSignerCertificates } from '../../cms/selectors/selectSignerCertificates'

/** The signer certificate's subject CN, or the whole subject when it has none. */
export const selectCommonName = (identity: CertificateIdentity): string => {
  const { subject } = new X509Certificate(
    selectSignerCertificates(identity).signer,
  )
  const line = subject.split('\n').find((part) => part.startsWith('CN='))
  return line ? line.slice(3) : subject.replace(/\n/g, ', ')
}
