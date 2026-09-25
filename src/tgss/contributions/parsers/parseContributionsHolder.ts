import { readXmlField } from '../../prosa/parsers/readXmlField'
import { unpadNif } from '../mappers/unpadNif'
import type { ContributionsHolder } from '../types/ContributionsHolder'
import { parseCodigoAttribute } from './parseCodigoAttribute'

/** The holder's name, NIF (without the portal's zero padding) and NAF. */
export const parseContributionsHolder = (xml: string): ContributionsHolder => {
  const rawNif = parseCodigoAttribute(xml, 'NIF')
  return {
    holder: readXmlField(xml, 'nombre'),
    nif: rawNif === undefined ? undefined : unpadNif(rawNif),
    naf: parseCodigoAttribute(xml, 'NAF'),
  }
}
