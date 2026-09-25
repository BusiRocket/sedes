import { describe, expect, it } from 'vitest'

import { renderTestElement } from '../fixtures/renderTestElement'
import { buildDigestElements } from './buildDigestElements'
import { buildText } from './buildText'

describe('buildDigestElements', () => {
  it('builds DigestMethod and DigestValue around the given node', () => {
    const value = buildText('')
    const [method, digest] = buildDigestElements('p', 'alg', value)
    value.value = 'abc='
    expect(
      [method, digest].map((element) => element && renderTestElement(element)),
    ).toEqual([
      '<p:DigestMethod Algorithm="alg"></p:DigestMethod>',
      '<p:DigestValue>abc=</p:DigestValue>',
    ])
  })
})
