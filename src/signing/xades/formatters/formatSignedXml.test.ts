import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../../xml/parsers/parseXmlDocument'
import { formatSignedXml } from './formatSignedXml'

describe('formatSignedXml', () => {
  it('writes a UTF-8 declaration and the canonical form with comments', () => {
    expect(
      formatSignedXml(parseXmlDocument("<a b='1'><!--c--><d/>ñ</a>")).toString(
        'utf8',
      ),
    ).toBe(
      '<?xml version="1.0" encoding="UTF-8"?>\n<a b="1"><!--c--><d></d>ñ</a>',
    )
  })
})
