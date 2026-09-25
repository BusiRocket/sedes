/** What every SRVO-JDIT step after the debt list needs: whose, which debt, the page token. */
export type LetterStepInput = {
  readonly nif: string
  readonly clave: string
  readonly puv: string
}
