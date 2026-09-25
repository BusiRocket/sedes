/** A holder's certificate and private key, both PEM encoded, as Node's TLS layer takes them. */
export type CertificateIdentity = {
  readonly cert: Buffer
  readonly key: Buffer
  readonly passphrase?: string | undefined
}
