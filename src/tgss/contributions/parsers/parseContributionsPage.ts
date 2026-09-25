import { readXmlField } from '../../prosa/parsers/readXmlField'
import type { ContributionsPage } from '../types/ContributionsPage'
import { parseContributionRows } from './parseContributionRows'

/**
 * The régimen the screen shows: its year, name and rows, and whether the
 * paging block (`dtPg/btSig`) offers a next régimen.
 */
export const parseContributionsPage = (xml: string): ContributionsPage => ({
  anio: readXmlField(xml, 'anio') ?? '',
  regimen: readXmlField(xml, 'regimen') ?? '',
  rows: parseContributionRows(xml),
  hasNext: readXmlField(xml, 'btSig') === '1',
})
