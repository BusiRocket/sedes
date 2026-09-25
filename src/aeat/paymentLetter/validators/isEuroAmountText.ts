/** `1234,56` or `1.234,56`: the amount format --importe accepts. */
export const isEuroAmountText = (text: string): boolean =>
  /^(?:\d+|\d{1,3}(?:\.\d{3})+),\d{2}$/.test(text)
