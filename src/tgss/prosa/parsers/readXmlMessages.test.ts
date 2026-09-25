import { describe, expect, it } from 'vitest'

import { readXmlMessages } from './readXmlMessages'

describe('readXmlMessages', () => {
  it('extracts every TEXTO in order, whitespace collapsed', () => {
    const xml =
      '<MESSAGES><MESSAGE><TEXTO><![CDATA[  first   line\n  wraps ]]></TEXTO></MESSAGE>' +
      '<MESSAGE><TEXTO><![CDATA[second]]></TEXTO></MESSAGE></MESSAGES>'
    expect(readXmlMessages(xml)).toEqual(['first line wraps', 'second'])
  })

  it('returns an empty array when there is no TEXTO', () => {
    expect(readXmlMessages('<ProsaXMLData></ProsaXMLData>')).toEqual([])
  })
})
