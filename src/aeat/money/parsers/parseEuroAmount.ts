/** Parse a Spanish-formatted amount ("1.234,56") into a plain number of euros. */
export const parseEuroAmount = (text: string): number =>
  Number.parseFloat(text.replaceAll('.', '').replace(',', '.'))
