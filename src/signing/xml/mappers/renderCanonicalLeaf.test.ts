import { describe, expect, it } from 'vitest'

import { renderCanonicalLeaf } from './renderCanonicalLeaf'

const without = { withComments: false, exclusive: false }
const withComments = { withComments: true, exclusive: false }

describe('renderCanonicalLeaf', () => {
  it('renders text, comments on request and PIs', () => {
    expect(renderCanonicalLeaf({ kind: 'text', value: 'a<b' }, without)).toBe(
      'a&lt;b',
    )
    expect(renderCanonicalLeaf({ kind: 'comment', value: 'c' }, without)).toBe(
      '',
    )
    expect(
      renderCanonicalLeaf({ kind: 'comment', value: 'c' }, withComments),
    ).toBe('<!--c-->')
    expect(
      renderCanonicalLeaf({ kind: 'pi', target: 'p', data: 'd' }, without),
    ).toBe('<?p d?>')
    expect(
      renderCanonicalLeaf({ kind: 'pi', target: 'p', data: '' }, without),
    ).toBe('<?p?>')
  })
})
