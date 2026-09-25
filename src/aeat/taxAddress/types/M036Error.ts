/** One five-digit AEAT error code the 036 prints, with its message; `00000` means none. */
export type M036Error = {
  readonly code: string
  readonly message: string
}
