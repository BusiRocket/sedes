import type { LetterStepInput } from '../types/LetterStepInput'

/** DetalleDda from the partial-payment list: one debt with its "Pagar" button. */
export const debtDetailForm = (
  input: LetterStepInput,
): Readonly<Record<string, string>> => ({
  fnif: input.nif,
  fliquidacion: input.clave,
  faccion: 'DETALLE_DDA',
  faccionorigen: 'PAGAR_PARCIAL_DDAS',
  fnddasemb: '1',
  fcostas: '0',
  fmigas: '4',
  pUV: input.puv,
})
