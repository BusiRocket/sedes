/** `1.234,56` -> 123456, in integers so no float rounding touches the amount. */
export const euroTextToCents = (text: string): number => {
  const match = /^(-?)([\d.]+),(\d{2})$/.exec(text.trim())
  if (!match) throw new Error(`not a euro amount: ${text}`)
  const [, sign = '', euros = '', cents = ''] = match
  const value = Number(euros.replaceAll('.', '')) * 100 + Number(cents)
  return sign === '-' ? -value : value
}
