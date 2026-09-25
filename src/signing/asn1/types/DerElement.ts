/** One DER element located inside a buffer: its tag and where header and value lie. */
export type DerElement = {
  readonly tag: number
  /** Offset of the identifier octet. */
  readonly start: number
  /** Offset of the first value octet. */
  readonly valueStart: number
  /** Offset just past the last value octet. */
  readonly end: number
}
