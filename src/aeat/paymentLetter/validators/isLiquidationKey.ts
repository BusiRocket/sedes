/** A liquidación key in either of the two shapes the AEAT debt list prints. */
export const isLiquidationKey = (text: string): boolean =>
  /^[A-Z]\d{6}[A-Z0-9]*$|^\d{4}[A-Z]{3}\d{3}[A-Z]\d+[A-Z]$/.test(text)
