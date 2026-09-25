import { unescapeJsString } from '../mappers/unescapeJsString'
import type { TaxAddressReceipt } from '../types/TaxAddressReceipt'

/** The visible labels and `/wlpl/` links of the 036 presentation answer. */
export const parseTaxAddressReceipt = (text: string): TaxAddressReceipt => ({
  labels: [...text.matchAll(/(?:label|value):'((?:[^'\\]|\\.)*)'/g)]
    .map(([, label = '']) => unescapeJsString(label).trim())
    .filter((label) => label !== '')
    .slice(0, 25),
  urls: [...text.matchAll(/\/wlpl\/[^"'\\ ]+/g)]
    .map(([url]) => url)
    .slice(0, 10),
})
