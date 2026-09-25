/**
 * A parsed PDF object, just structured enough to edit dictionaries and
 * arrays: everything else (numbers, names, strings, booleans, null) keeps its
 * source text in `raw`, so re-serialising never alters it.
 */
export type PdfValue =
  | {
      readonly kind: 'dict'
      readonly entries: readonly (readonly [string, PdfValue])[]
    }
  | { readonly kind: 'array'; readonly items: readonly PdfValue[] }
  | { readonly kind: 'ref'; readonly num: number; readonly gen: number }
  | { readonly kind: 'raw'; readonly text: string }
