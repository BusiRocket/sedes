import { readXmlField } from './readXmlField'

/** The four DatosAuditoria fields a Prosa screen must echo back verbatim on the next POST. */
export const readAuditFields = (xml: string): Record<string, string> => {
  const names = [
    'NIFInteresado',
    'TIPOpcionSeleccionada',
    'DETModoEjecucion',
    'DOCDocumento',
  ] as const
  return Object.fromEntries(
    names.map((name) => [name, readXmlField(xml, name) ?? '']),
  )
}
