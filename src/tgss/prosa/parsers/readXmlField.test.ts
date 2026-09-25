import { describe, expect, it } from 'vitest'

import { readXmlField } from './readXmlField'

describe('readXmlField', () => {
  it('reads a plain element', () => {
    expect(
      readXmlField('<tipoEjecucion>O</tipoEjecucion>', 'tipoEjecucion'),
    ).toBe('O')
  })

  it('unwraps a CDATA section', () => {
    const xml = '<nombre><![CDATA[JANE DOE]]></nombre>'
    expect(readXmlField(xml, 'nombre')).toBe('JANE DOE')
  })

  it('returns undefined when the tag is missing', () => {
    expect(readXmlField('<a>1</a>', 'b')).toBeUndefined()
  })

  it('returns undefined when the closing tag is missing', () => {
    expect(readXmlField('<a>1', 'a')).toBeUndefined()
  })
})
