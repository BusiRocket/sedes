/** One SCEJ-MANT search: the modelo and ejercicio are mandatory, the periodo optional. */
export type FilingsQuery = {
  readonly modelo: string
  readonly ejercicio: string
  readonly periodo?: string | undefined
}
