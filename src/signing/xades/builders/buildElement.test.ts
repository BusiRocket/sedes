import { describe, expect, it } from 'vitest'

import { buildElement } from './buildElement'

describe('buildElement', () => {
  it('keeps attribute order and copies the children', () => {
    const children = [{ kind: 'text', value: 'x' } as const]
    const element = buildElement('a', { z: '1', a: '2' }, children)
    expect(element.attributes.map((attribute) => attribute.name)).toEqual([
      'z',
      'a',
    ])
    expect(element.children).toEqual(children)
    expect(element.children).not.toBe(children)
    expect(buildElement('b', {}).children).toEqual([])
  })
})
