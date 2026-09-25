/** The result of driving a Prosa Continuar screen: a dead end with the portal's message, or a ready document. */
export type ProsaEmissionOutcome =
  | { readonly issued: false; readonly message: string }
  | { readonly issued: true; readonly xml: string }
