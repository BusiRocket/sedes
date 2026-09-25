import { describe, expect, it } from 'vitest'

import { parseOptionalXml } from './parseOptionalXml'

describe('parseOptionalXml', () => {
  it('answers the tree of XML and undefined for anything else', () => {
    expect(parseOptionalXml(Buffer.from('<a/>'))?.root.name).toBe('a')
    expect(parseOptionalXml(Buffer.from('%PDF-1.7'))).toBeUndefined()
  })
})
