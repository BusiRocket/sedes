import { readXmlField } from './parsers/readXmlField'

/** Pick the submit action name the Continuar screen is currently offering. */
export const nextProsaAction = (xml: string): string => {
  if (readXmlField(xml, 'mostrarConfirmacion') === 'S')
    return 'CONFIRMAR_SIT_68'
  if (readXmlField(xml, 'tipoEjecucion') === 'D') return 'CONFIRMAR'
  return 'IMPRIMIR'
}
