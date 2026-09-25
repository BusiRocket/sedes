import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { inheritedXmlAttributes } from './inheritedXmlAttributes'

describe('inheritedXmlAttributes', () => {
  it('collects xml:* attributes with the nearest ancestor winning', () => {
    const { root } = parseXmlDocument(
      '<a xml:lang="en" xml:space="preserve" x="1"><b xml:lang="es"/></a>',
    )
    const child = root.children[0]
    if (child?.kind !== 'element') throw new Error('no child')
    expect(inheritedXmlAttributes([root, child])).toEqual([
      { name: 'xml:lang', value: 'es' },
      { name: 'xml:space', value: 'preserve' },
    ])
  })
})
