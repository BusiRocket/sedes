import { rootCertificates } from 'node:tls'

import { fnmtServerRootCertificate } from './fnmtServerRootCertificate'

/** Node's bundled roots plus the FNMT server root some administrations chain to. */
export const trustedCertificateAuthorities: readonly string[] = [
  ...rootCertificates,
  fnmtServerRootCertificate,
]
