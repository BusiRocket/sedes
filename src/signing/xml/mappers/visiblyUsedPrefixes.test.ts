import { describe, expect, it } from 'vitest'

import { visiblyUsedPrefixes } from './visiblyUsedPrefixes'

describe('visiblyUsedPrefixes', () => {
  it('collects the element and attribute prefixes, not xml or declarations', () => {
    const used = visiblyUsedPrefixes({
      kind: 'element',
      name: 'a:e',
      attributes: [
        { name: 'b:x', value: '' },
        { name: 'xml:lang', value: 'es' },
        { name: 'xmlns:c', value: 'u' },
        { name: 'y', value: '' },
      ],
      children: [],
    })
    expect([...used].toSorted()).toEqual(['a', 'b'])
  })
  it('counts the default namespace for an unprefixed element', () => {
    const used = visiblyUsedPrefixes({
      kind: 'element',
      name: 'e',
      attributes: [],
      children: [],
    })
    expect([...used]).toEqual([''])
  })
})
