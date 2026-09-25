import { describe, expect, it } from 'vitest'

import { readMisc } from './readMisc'

describe('readMisc', () => {
  it('reads comments and PIs around whitespace', () => {
    const cursor = { text: ' <!--a--> <?p?>\n<r/>', position: 0 }
    expect(readMisc(cursor).map((node) => node.kind)).toEqual(['comment', 'pi'])
    expect(cursor.text.slice(cursor.position)).toBe('<r/>')
  })
  it('refuses a document type declaration', () => {
    expect(() =>
      readMisc({ text: '<!DOCTYPE a []><a/>', position: 0 }),
    ).toThrow('document type declarations are not accepted')
  })
})
