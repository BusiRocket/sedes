import { describe, expect, it } from 'vitest'

import { readProsaPayload } from './readProsaPayload'

const prosaPage = (ticket: string, xml: string): string =>
  `<html><body><input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/>` +
  `<script id="xml" type="text/plain">${xml}</script></body></html>`

describe('readProsaPayload', () => {
  it('reads the ticket and the ProsaXMLData block', () => {
    const xml = '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const result = readProsaPayload(prosaPage('a66813372eac4554', xml))
    expect(result.ticket).toBe('a66813372eac4554')
    expect(result.xml).toBe(xml)
  })

  it('throws when the ticket element is missing', () => {
    const xml = '<script id="xml" type="text/plain">data</script>'
    expect(() => readProsaPayload(xml)).toThrow(/no Prosa ticket/)
  })

  it('throws when the xml script block is missing', () => {
    const html = '<input type="hidden" id="ARQ.SPM.TICKET" value="a1"/>'
    expect(() => readProsaPayload(html)).toThrow(/no Prosa ticket/)
  })
})
