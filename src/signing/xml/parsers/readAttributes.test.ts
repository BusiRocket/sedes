import { describe, expect, it } from 'vitest'

import { readAttributes } from './readAttributes'

const read = (text: string): ReturnType<typeof readAttributes> =>
  readAttributes({ text, position: 0 })

describe('readAttributes', () => {
  it('reads attributes up to ">"', () => {
    expect(read(' a = "1"  b="2">')).toEqual({
      attributes: [
        { name: 'a', value: '1' },
        { name: 'b', value: '2' },
      ],
      selfClosing: false,
    })
  })
  it('recognises "/>"', () => {
    expect(read(' />')).toEqual({ attributes: [], selfClosing: true })
  })
  it('refuses duplicates and missing whitespace', () => {
    expect(() => read(' a="1" a="2">')).toThrow('duplicate attribute "a"')
    expect(() => read(' a="1"b="2">')).toThrow('expected whitespace')
  })
})
