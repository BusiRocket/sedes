import { readAttribute } from '../html/readAttribute'
import { unescapeHtml } from '../html/unescapeHtml'
import type { AgreementListing } from './AgreementListing'

/**
 * Every agreement (`cacuerdo=`) linked from the SRAF request listing,
 * deduplicated by code (each row links to it twice: cell text and 'Ventana').
 */
export const parseAgreementList = (
  html: string,
  baseUrl: string,
): readonly AgreementListing[] => {
  const seen = new Set<string>()
  const listings: AgreementListing[] = []
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = readAttribute(tag, 'href')
    if (!href || !href.includes('AcuAccDeta')) continue
    const acuerdo = /cacuerdo=(\w+)/.exec(href)?.[1]
    if (!acuerdo || seen.has(acuerdo)) continue
    seen.add(acuerdo)
    listings.push({
      acuerdo,
      detailUrl: new URL(unescapeHtml(href), baseUrl).toString(),
    })
  }
  return listings
}
