import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from './parseXmlDocument'

describe('parseXmlDocument', () => {
  it('parses declaration, prolog, root and epilog', () => {
    const document = parseXmlDocument(
      '<?xml version="1.0"?>\r\n<!--p--><r xmlns:a="u" a:x="1">t\r\n</r><?e?>',
    )
    expect(document.prolog).toEqual([{ kind: 'comment', value: 'p' }])
    expect(document.root.name).toBe('r')
    expect(document.root.children).toEqual([{ kind: 'text', value: 't\n' }])
    expect(document.epilog).toEqual([{ kind: 'pi', target: 'e', data: '' }])
  })
  it('accepts bytes', () => {
    expect(parseXmlDocument(Buffer.from('<r/>')).root.name).toBe('r')
  })
  it('refuses text instead of a root, trailing content and bad prefixes', () => {
    expect(() => parseXmlDocument('text')).toThrow('expected the root element')
    expect(() => parseXmlDocument('<a/><b/>')).toThrow(
      'content after the root element',
    )
    expect(() => parseXmlDocument('<p:a/>')).toThrow(
      'undeclared namespace prefix',
    )
  })
})
