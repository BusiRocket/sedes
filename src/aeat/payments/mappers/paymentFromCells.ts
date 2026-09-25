import { toMoneyAmount } from '../../money/mappers/toMoneyAmount'
import type { AeatPayment } from '../types/AeatPayment'
import { isoDateFromSpanish } from './isoDateFromSpanish'
import { splitModeloField } from './splitModeloField'

/**
 * One MisPagos row from its six data cells and the NRC of its Descargar link.
 * An autoliquidación prints `-` as justificante; the receipt number is then
 * the first 13 characters of the NRC, which is what the other rows print.
 */
export const paymentFromCells = (
  cells: readonly string[],
  nrc: string,
): AeatPayment => {
  const [
    tipo = '',
    modeloCell = '',
    justificante = '',
    importe = '',
    entidad = '',
    fecha = '',
  ] = cells
  const justificanteLength = 13
  return {
    tipo,
    ...splitModeloField(modeloCell),
    justificante: /^\w{13}$/.test(justificante)
      ? justificante
      : nrc.slice(0, justificanteLength),
    nrc,
    importe: toMoneyAmount(importe.replace(/[\s€\u0080]+$/, '')),
    entidad,
    fecha: isoDateFromSpanish(fecha),
  }
}
