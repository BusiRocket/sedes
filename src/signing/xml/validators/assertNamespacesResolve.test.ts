import { describe, expect, it } from 'vitest'

import type { XmlElement } from '../types/XmlElement'
import { assertNamespacesResolve } from './assertNamespacesResolve'

const element = (
  name: string,
  attributes: XmlElement['attributes'],
  children: XmlElement[] = [],
): XmlElement => ({ kind: 'element', name, attributes, children })

describe('assertNamespacesResolve', () => {
  it('accepts declared prefixes, including inherited ones and xml', () => {
    expect(() => {
      assertNamespacesResolve(
        element(
          'p:a',
          [{ name: 'xmlns:p', value: 'u' }],
          [
            element('p:b', [
              { name: 'xml:lang', value: 'es' },
              { name: 'p:x', value: '1' },
            ]),
          ],
        ),
      )
    }).not.toThrow()
  })
  it('refuses an undeclared element or attribute prefix', () => {
    expect(() => {
      assertNamespacesResolve(element('a', [], [element('q:b', [])]))
    }).toThrow('undeclared namespace prefix in <q:b>')
    expect(() => {
      assertNamespacesResolve(element('a', [{ name: 'q:x', value: '' }]))
    }).toThrow('undeclared namespace prefix in <a>')
  })
})
