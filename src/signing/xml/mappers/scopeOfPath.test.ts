import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { scopeOfPath } from './scopeOfPath'

describe('scopeOfPath', () => {
  it('accumulates declarations down the path', () => {
    const { root } = parseXmlDocument('<a xmlns:p="1"><b xmlns="2"/></a>')
    const child = root.children[0]
    if (child?.kind !== 'element') throw new Error('no child')
    expect(Object.fromEntries(scopeOfPath([root, child]))).toMatchObject({
      p: '1',
      '': '2',
    })
  })
})
