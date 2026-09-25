/** The verification code on the "Código: XXXXX-..." line, or undefined when absent. */
export const parseDebtReportReference = (text: string): string | undefined =>
  /Código:\s*([A-Z0-9-]+)/.exec(text)?.[1]
