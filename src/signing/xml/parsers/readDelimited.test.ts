import { describe, expect, it } from 'vitest'

import { readDelimited } from './readDelimited'

describe('readDelimited', () => {
  it('answers the body and moves past the closer', () => {
    const cursor = { text: '<![CDATA[a<b]]>c', position: 0 }
    expect(readDelimited(cursor, '<![CDATA[', ']]>')).toBe('a<b')
    expect(cursor.position).toBe(15)
  })
  it('fails when the closer is missing', () => {
    expect(() =>
      readDelimited({ text: '<!-- x', position: 0 }, '<!--', '-->'),
    ).toThrow('missing "-->"')
  })
})
