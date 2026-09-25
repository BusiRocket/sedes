import { parseEuroAmount } from '../../debt/parsers/parseEuroAmount'
import { readXmlField } from '../../prosa/parsers/readXmlField'
import type { ContributionRow } from '../types/ContributionRow'

/**
 * Every `<filaBYC>` of the screen. A row carries the cuota twice; the first
 * is the one the screen shows, the second its integer part.
 */
export const parseContributionRows = (
  xml: string,
): readonly ContributionRow[] =>
  [...xml.matchAll(/<filaBYC>([\s\S]*?)<\/filaBYC>/g)].map((match) => {
    const row = match[1] ?? ''
    return {
      mes: readXmlField(row, 'mes') ?? '',
      base: parseEuroAmount(readXmlField(row, 'base') ?? '0'),
      cuota: parseEuroAmount(readXmlField(row, 'cuota') ?? '0'),
      recargo: parseEuroAmount(readXmlField(row, 'rec') ?? '0'),
      sepe: readXmlField(row, 'marcaSSSEPE') === 'S',
    }
  })
