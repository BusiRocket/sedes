/** Base64 modulus and exponent of an RSA public key (ds:RSAKeyValue). */
export type RsaKeyValue = {
  readonly modulus: string
  readonly exponent: string
}
