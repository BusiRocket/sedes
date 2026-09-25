import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { selectElementPath } from '../selectors/selectElementPath'
import { canonicalizeSubtree } from './canonicalizeSubtree'

// The document of the Exclusive XML Canonicalization spec, section 2.2.
const source = `<n0:local xmlns:n0="foo:bar" xmlns:n3="ftp://example.org">
  <n1:elem2 xmlns:n1="http://example.net" xml:lang="en">
    <n3:stuff xmlns:n3="ftp://example.org"/>
  </n1:elem2>
</n0:local>`

const elem2 = (): ReturnType<typeof selectElementPath> =>
  selectElementPath(
    parseXmlDocument(source).root,
    (element) => element.name === 'n1:elem2',
  )

describe('canonicalizeSubtree', () => {
  it('renders the inherited namespaces inclusively', () => {
    expect(
      canonicalizeSubtree(elem2() ?? [], {
        withComments: false,
        exclusive: false,
      }),
    ).toBe(
      '<n1:elem2 xmlns:n0="foo:bar" xmlns:n1="http://example.net" xmlns:n3="ftp://example.org" xml:lang="en">\n    <n3:stuff></n3:stuff>\n  </n1:elem2>',
    )
  })
  it('renders only visibly used namespaces exclusively', () => {
    expect(
      canonicalizeSubtree(elem2() ?? [], {
        withComments: false,
        exclusive: true,
      }),
    ).toBe(
      '<n1:elem2 xmlns:n1="http://example.net" xml:lang="en">\n    <n3:stuff xmlns:n3="ftp://example.org"></n3:stuff>\n  </n1:elem2>',
    )
  })
  it('inherits xml:* attributes from ancestors inclusively', () => {
    const { root } = parseXmlDocument('<a xml:lang="es"><b/></a>')
    const path = selectElementPath(root, (element) => element.name === 'b')
    expect(
      canonicalizeSubtree(path ?? [], {
        withComments: false,
        exclusive: false,
      }),
    ).toBe('<b xml:lang="es"></b>')
  })
  it('refuses an empty path', () => {
    expect(() =>
      canonicalizeSubtree([], { withComments: false, exclusive: false }),
    ).toThrow('empty element path')
  })
})
