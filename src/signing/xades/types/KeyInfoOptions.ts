/** What ds:KeyInfo carries. */
export type KeyInfoOptions = {
  /** Every certificate of the identity PEM (signer first) rather than the signer alone. */
  readonly chain: boolean
  /** Add ds:KeyValue/ds:RSAKeyValue. */
  readonly keyValue: boolean
  /** Sign ds:KeyInfo too, with its own Reference in SignedInfo. */
  readonly reference: boolean
}
