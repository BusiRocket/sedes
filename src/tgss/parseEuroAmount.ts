/** Convert a Spanish-formatted amount ("1.234,56") into euros as a number. */
export const parseEuroAmount = (value: string): number =>
  Number(value.replaceAll('.', '').replace(',', '.'))
