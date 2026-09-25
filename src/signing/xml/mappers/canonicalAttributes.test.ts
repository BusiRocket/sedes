import { describe, expect, it } from 'vitest'

import { canonicalAttributes } from './canonicalAttributes'

describe('canonicalAttributes', () => {
  it('sorts by namespace URI then local name and drops declarations', () => {
    const scope = new Map([
      ['a', 'http://www.w3.org'],
      ['b', 'http://www.ietf.org'],
    ])
    expect(
      canonicalAttributes(
        [
          { name: 'a:attr', value: 'out' },
          { name: 'b:attr', value: 'sorted' },
          { name: 'attr2', value: 'all' },
          { name: 'attr', value: 'I"m' },
          { name: 'b:attr0', value: '' },
          { name: 'xmlns:a', value: 'http://www.w3.org' },
        ],
        scope,
      ),
    ).toBe(
      ' attr="I&quot;m" attr2="all" b:attr="sorted" b:attr0="" a:attr="out"',
    )
  })
  it('treats an unresolvable prefix as no namespace', () => {
    expect(
      canonicalAttributes(
        [
          { name: 'z', value: '1' },
          { name: 'q:a', value: '2' },
        ],
        new Map(),
      ),
    ).toBe(' q:a="2" z="1"')
  })
})
