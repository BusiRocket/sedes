import { describe, expect, it } from 'vitest'

import { readAttributeValue } from './readAttributeValue'

const read = (text: string): string => readAttributeValue({ text, position: 0 })

describe('readAttributeValue', () => {
  it('normalises literal whitespace and keeps referenced whitespace', () => {
    expect(read('"a\tb\nc&#9;&#xA;"')).toBe('a b c\t\n')
  })
  it('accepts either quote', () => {
    expect(read(`'say "hi"'`)).toBe('say "hi"')
  })
  it('refuses unquoted, unterminated and "<" values', () => {
    expect(() => read('a')).toThrow('expected a quoted value')
    expect(() => read('"abc')).toThrow('unterminated value')
    expect(() => read('"a<b"')).toThrow('"<" in a value')
  })
})
