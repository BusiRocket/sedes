import { describe, expect, it } from 'vitest'

import type { XmlElement } from '../types/XmlElement'
import { canonicalNamespaces } from './canonicalNamespaces'

const element: XmlElement = {
  kind: 'element',
  name: 'a:e',
  attributes: [],
  children: [],
}
const scope = new Map([
  ['xml', 'x'],
  ['a', 'ua'],
  ['b', 'ub'],
  ['', 'ud'],
])

describe('canonicalNamespaces', () => {
  it('renders every in-scope binding the output has not seen, sorted', () => {
    const result = canonicalNamespaces(element, scope, new Map([['b', 'ub']]), {
      withComments: false,
      exclusive: false,
    })
    expect(result.declarations).toEqual([
      ['', 'ud'],
      ['a', 'ua'],
    ])
    expect(result.rendered.get('a')).toBe('ua')
  })
  it('renders only used and listed prefixes when exclusive', () => {
    const result = canonicalNamespaces(element, scope, new Map(), {
      withComments: false,
      exclusive: true,
      inclusivePrefixes: ['#default', 'zz'],
    })
    expect(result.declarations).toEqual([
      ['', 'ud'],
      ['a', 'ua'],
    ])
  })
  it('undeclares the default namespace only when the output had one', () => {
    const empty = new Map([['', '']])
    const options = { withComments: false, exclusive: false }
    const plain = { ...element, name: 'e' }
    expect(
      canonicalNamespaces(plain, empty, new Map(), options).declarations,
    ).toEqual([])
    expect(
      canonicalNamespaces(plain, empty, new Map([['', 'ud']]), options)
        .declarations,
    ).toEqual([['', '']])
  })
})
