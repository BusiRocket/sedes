import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { selectElementPath } from './selectElementPath'

describe('selectElementPath', () => {
  const { root } = parseXmlDocument('<a><b><c id="1"/></b><c id="2"/></a>')
  it('answers the root-to-match path in document order', () => {
    const path = selectElementPath(root, (element) => element.name === 'c')
    expect(path?.map((element) => element.name)).toEqual(['a', 'b', 'c'])
    expect(path?.at(-1)?.attributes[0]?.value).toBe('1')
  })
  it('answers undefined when nothing matches', () => {
    expect(selectElementPath(root, () => false)).toBeUndefined()
  })
})
