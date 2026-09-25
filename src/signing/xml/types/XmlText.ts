/** Character data, CDATA sections included, entities already decoded. */
export type XmlText = {
  readonly kind: 'text'
  value: string
}
