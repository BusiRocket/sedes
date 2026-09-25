import type { ModeloField } from '../types/ModeloField'

/**
 * Split the "Modelo/Ej/Periodo" cell: an autoliquidación prints
 * `130/2025/1T`, a deferral instalment (`002`), a carta de pago (`010`) or
 * a tasa (`791`) prints the model alone.
 */
export const splitModeloField = (cell: string): ModeloField => {
  const [modelo = '', ejercicio, periodo] = cell
    .split('/')
    .map((part) => part.trim())
  return {
    modelo,
    ejercicio: ejercicio === '' ? undefined : ejercicio,
    periodo: periodo === '' ? undefined : periodo,
  }
}
