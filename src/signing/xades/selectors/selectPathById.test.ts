import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../../xml/parsers/parseXmlDocument'
import { selectPathById } from './selectPathById'

describe('selectPathById', () => {
  const { root } = parseXmlDocument('<a><b Id="x"/><c id="y"/></a>')
  it('finds the element by its Id attribute', () => {
    expect(selectPathById(root, 'x').map((element) => element.name)).toEqual([
      'a',
      'b',
    ])
  })
  it('fails when no element carries that Id', () => {
    expect(() => selectPathById(root, 'y')).toThrow('no element with Id "y"')
  })
})
