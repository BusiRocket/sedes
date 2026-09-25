import type { LetterStepInput } from '../types/LetterStepInput'

/** ResumenDdas `faccion=PAGAR`: the editable amount screen for one debt. */
export const paymentSummaryForm = (
  input: LetterStepInput,
  pendingCents: number,
): Readonly<Record<string, string>> => ({
  fnif: input.nif,
  fliquidacion: input.clave,
  faccion: 'PAGAR',
  fimptotalemb: String(pendingCents),
  faccionorigen: 'DETALLE_DDA',
  faccionorigen2: 'PAGAR_PARCIAL_DDAS',
  fmigas: '45',
  pUV: input.puv,
})
