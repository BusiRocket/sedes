import { readXmlField } from '../../prosa/parsers/readXmlField'

/**
 * The applicant's name from the INAF header (`NOM_solicitante` and the two
 * surnames). The first `<nombre>` of several INAF screens is the local part
 * of the holder's e-mail, so it is never used here.
 */
export const parseHolderName = (xml: string): string | undefined => {
  const parts = ['NOM_solicitante', 'AP1_solicitante', 'AP2_solicitante']
    .map((tag) => readXmlField(xml, tag) ?? '')
    .filter((part) => part !== '')
  return parts.length === 0 ? undefined : parts.join(' ')
}
