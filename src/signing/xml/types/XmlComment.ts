/** A comment, without its `<!--` and `-->` delimiters. */
export type XmlComment = {
  readonly kind: 'comment'
  readonly value: string
}
