/** A processing instruction other than the XML declaration. */
export type XmlProcessingInstruction = {
  readonly kind: 'pi'
  readonly target: string
  readonly data: string
}
