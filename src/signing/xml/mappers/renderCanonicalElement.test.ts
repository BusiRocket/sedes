import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { baseNamespaceScope } from './baseNamespaceScope'
import { renderCanonicalElement } from './renderCanonicalElement'

describe('renderCanonicalElement', () => {
  it('renders empty elements as start and end tags, minus the excluded subtree', () => {
    const { root } = parseXmlDocument('<a><b/><c><d/></c></a>')
    const excluded = root.children[1]
    expect(
      renderCanonicalElement(
        root,
        { scope: baseNamespaceScope(), rendered: new Map(), inherited: [] },
        { withComments: false, exclusive: false, exclude: excluded },
      ),
    ).toBe('<a><b></b></a>')
  })
  it('lets the element own attribute override an inherited one', () => {
    const { root } = parseXmlDocument('<a xml:lang="es"/>')
    expect(
      renderCanonicalElement(
        root,
        {
          scope: baseNamespaceScope(),
          rendered: new Map(),
          inherited: [
            { name: 'xml:lang', value: 'en' },
            { name: 'xml:space', value: 'preserve' },
          ],
        },
        { withComments: false, exclusive: false },
      ),
    ).toBe('<a xml:lang="es" xml:space="preserve"></a>')
  })
})
