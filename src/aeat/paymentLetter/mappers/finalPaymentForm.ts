import type { LetterStepInput } from '../types/LetterStepInput'
import { splitCents } from './splitCents'

/**
 * FinalPago `faccion=DETALLE_PAGO`: generates the carta de pago for the
 * selected amount. It charges nothing; the gateway buttons that would are
 * never posted.
 */
export const finalPaymentForm = (
  input: LetterStepInput,
  pendingCents: number,
  selectedCents: number,
): Readonly<Record<string, string>> => {
  const selected = splitCents(selectedCents)
  return {
    fnif: input.nif,
    fliquidacion: input.clave,
    faccion: 'DETALLE_PAGO',
    fimpselecc: selected.euros,
    fimpseleccdec: selected.decimals,
    fimptotal: String(pendingCents),
    fimptotalemb: String(pendingCents),
    fnumorden: '0',
    fnddasemb: '1',
    fcostas: '0',
    fcaracterizacion: '2',
    fmodoseleccion: 'DETALLE_DDA',
    fmigas: '456',
    pUV: input.puv,
  }
}
