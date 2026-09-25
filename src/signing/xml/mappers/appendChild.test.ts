import { describe, expect, it } from 'vitest'

import type { XmlElement } from '../types/XmlElement'
import { appendChild } from './appendChild'

describe('appendChild', () => {
  it('merges adjacent text and keeps other nodes apart', () => {
    const parent: XmlElement = {
      kind: 'element',
      name: 'a',
      attributes: [],
      children: [],
    }
    appendChild(parent, { kind: 'text', value: 'x' })
    appendChild(parent, { kind: 'text', value: 'y' })
    appendChild(parent, { kind: 'comment', value: 'c' })
    expect(parent.children).toEqual([
      { kind: 'text', value: 'xy' },
      { kind: 'comment', value: 'c' },
    ])
  })
})
