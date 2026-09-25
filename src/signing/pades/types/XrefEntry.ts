/** Where an object lives: at a byte offset, inside an object stream, or nowhere (freed). */
export type XrefEntry =
  | { readonly type: 'offset'; readonly offset: number }
  | {
      readonly type: 'compressed'
      readonly stream: number
      readonly index: number
    }
  | { readonly type: 'free' }
