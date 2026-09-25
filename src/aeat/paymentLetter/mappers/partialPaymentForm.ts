/** The debt-list form after "Pago parcial": the partial-payment list for the NIF. */
export const partialPaymentForm = (
  nif: string,
  puv: string,
): Readonly<Record<string, string>> => ({
  fnif: nif,
  faccion: 'PAGAR_PARCIAL_DDAS',
  faccionorigen: 'CONS_DDAS',
  pUV: puv,
})
