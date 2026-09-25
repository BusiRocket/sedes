/** What a CMS signer needs from its X.509 certificate, as DER. */
export type CertificateParts = {
  /** The whole certificate. */
  readonly der: Buffer
  /** The issuer Name (a SEQUENCE), encoded exactly as in the certificate. */
  readonly issuer: Buffer
  /** The serialNumber INTEGER element, encoded exactly as in the certificate. */
  readonly serialNumber: Buffer
}
