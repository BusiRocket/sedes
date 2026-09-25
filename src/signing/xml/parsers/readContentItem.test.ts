import { describe, expect, it } from 'vitest'

import { readContentItem } from './readContentItem'

const read = (text: string): ReturnType<typeof readContentItem> =>
  readContentItem({ text, position: 0 })

describe('readContentItem', () => {
  it('dispatches every kind of content', () => {
    expect(read('</a >')).toEqual({ type: 'end', name: 'a' })
    expect(read('<!--c-->')).toEqual({
      type: 'node',
      node: { kind: 'comment', value: 'c' },
    })
    expect(read('<![CDATA[<x>]]>')).toEqual({
      type: 'node',
      node: { kind: 'text', value: '<x>' },
    })
    expect(read('<?p d?>')).toMatchObject({ node: { kind: 'pi' } })
    expect(read('<b>')).toMatchObject({ type: 'start', selfClosing: false })
    expect(read('text<')).toEqual({
      type: 'node',
      node: { kind: 'text', value: 'text' },
    })
  })
  it('refuses declarations and the end of input', () => {
    expect(() => read('<!ENTITY x>')).toThrow('declaration inside content')
    expect(() => read('')).toThrow('unexpected end of document')
  })
})
