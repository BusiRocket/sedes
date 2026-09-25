import { describe, expect, it } from 'vitest'

import { extendNamespaceScope } from './extendNamespaceScope'

describe('extendNamespaceScope', () => {
  it('adds default and prefixed declarations without touching the outer scope', () => {
    const outer = new Map([['a', 'old']])
    const inner = extendNamespaceScope(outer, {
      kind: 'element',
      name: 'e',
      attributes: [
        { name: 'xmlns', value: 'd' },
        { name: 'xmlns:a', value: 'new' },
        { name: 'x', value: '1' },
      ],
      children: [],
    })
    expect(Object.fromEntries(inner)).toEqual({ a: 'new', '': 'd' })
    expect(outer.get('a')).toBe('old')
  })
})
