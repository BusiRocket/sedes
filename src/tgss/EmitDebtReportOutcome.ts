/** The result of driving the Continuar screen: either a dead end with a message, or a ready document. */
export type EmitDebtReportOutcome =
  | { readonly hasDebt: false; readonly message: string }
  | { readonly hasDebt: true; readonly xml: string }
