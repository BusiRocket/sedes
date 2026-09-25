import { describe, expect, it } from 'vitest'

import { derNull } from '../derNull'
import { derOctetString } from '../derOctetString'
import { derSequence } from '../derSequence'
import { readDerChildren } from './readDerChildren'
import { readDerElement } from './readDerElement'

describe('readDerChildren', () => {
  it('lists the direct children of a constructed element', () => {
    const der = derSequence([derNull(), derOctetString(Buffer.from([7]))])
    const children = readDerChildren(der, readDerElement(der, 0))
    expect(children.map((child) => child.tag)).toEqual([5, 4])
  })
})
