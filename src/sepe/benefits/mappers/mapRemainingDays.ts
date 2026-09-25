/** `diasDerecho` minus `diasConsumidos` when both are whole numbers, else undefined. */
export const mapRemainingDays = (
  fields: Readonly<Record<string, string>>,
): number | undefined => {
  const granted = fields['diasDerecho']
  const consumed = fields['diasConsumidos']
  if (granted === undefined || consumed === undefined) return undefined
  if (!/^\d+$/.test(granted) || !/^\d+$/.test(consumed)) return undefined
  return Number(granted) - Number(consumed)
}
