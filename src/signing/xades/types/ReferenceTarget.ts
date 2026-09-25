/** What a ds:Reference digests. */
export type ReferenceTarget =
  | { readonly kind: 'enveloped' }
  | { readonly kind: 'id'; readonly id: string }
  | { readonly kind: 'bytes'; readonly data: Buffer }
