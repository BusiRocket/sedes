/** Render a euro amount the way the portal's own pages show one: dot thousands, comma decimals, two places. */
export const euroAmountText = (value: number): string =>
  value.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  })
