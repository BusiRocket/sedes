import { readFile } from 'node:fs/promises'

import type { CertificateIdentity } from './types/CertificateIdentity'

/**
 * Read the certificate and key from explicit paths, falling back to the
 * `SEDES_CERT` and `SEDES_KEY` environment variables. Both are PEM files; a
 * PKCS#12 bundle is converted once with
 * `openssl pkcs12 -legacy -in cert.p12 -clcerts -nokeys -out cert.pem` and
 * `openssl pkcs12 -legacy -in cert.p12 -nocerts -nodes -out key.pem`.
 */
export const loadCertificateIdentity = async (paths: {
  readonly cert?: string | undefined
  readonly key?: string | undefined
}): Promise<CertificateIdentity> => {
  const certPath = paths.cert ?? process.env['SEDES_CERT']
  const keyPath = paths.key ?? process.env['SEDES_KEY']
  if (!certPath || !keyPath)
    throw new Error(
      'certificate required: pass --cert and --key, or set SEDES_CERT and SEDES_KEY',
    )
  // The paths are the holder's own, given on the command line or in the
  // environment: reading them is the feature, not an injection surface.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const cert = await readFile(certPath)
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const key = await readFile(keyPath)
  return { cert, key, passphrase: process.env['SEDES_KEY_PASSPHRASE'] }
}
