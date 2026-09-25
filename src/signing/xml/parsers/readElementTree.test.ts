import { describe, expect, it } from 'vitest'

import { readElementTree } from './readElementTree'

describe('readElementTree', () => {
  it('builds nested elements and merges text around CDATA', () => {
    const root = readElementTree({
      text: '<a>x<![CDATA[y]]>z<b/><c>t</c></a>',
      position: 0,
    })
    expect(root.children.map((child) => child.kind)).toEqual([
      'text',
      'element',
      'element',
    ])
    expect(root.children[0]).toEqual({ kind: 'text', value: 'xyz' })
  })
  it('answers a self-closed root at once', () => {
    expect(readElementTree({ text: '<a/>', position: 0 }).children).toEqual([])
  })
  it('refuses mismatched end tags', () => {
    expect(() => readElementTree({ text: '<a><b></a>', position: 0 })).toThrow(
      '"</a>" closes "<b>"',
    )
  })
})
