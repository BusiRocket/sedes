import type { HtmlForm } from '../../html/types/HtmlForm'

/** A JSF form ready to submit through one image button, the other image buttons left out. */
export type ImageButtonForm = {
  readonly form: HtmlForm
  readonly button: string
}
