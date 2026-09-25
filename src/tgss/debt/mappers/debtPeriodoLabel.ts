/** `periodo` as the report shows it: one month, or a `desde-hasta` range when the document spans several. */
export const debtPeriodoLabel = (desde: string, hasta: string): string =>
  desde === hasta ? desde : `${desde}-${hasta}`
