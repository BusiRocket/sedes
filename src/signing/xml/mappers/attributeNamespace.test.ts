import { describe, expect, it } from 'vitest'

import { attributeNamespace } from './attributeNamespace'

describe('attributeNamespace', () => {
  it('gives unprefixed attributes no namespace and resolves prefixes', () => {
    const scope = new Map([
      ['', 'default'],
      ['a', 'uri-a'],
    ])
    expect(attributeNamespace('x', scope)).toBe('')
    expect(attributeNamespace('a:x', scope)).toBe('uri-a')
    expect(attributeNamespace('b:x', scope)).toBeUndefined()
  })
})
