import { describe, expect, it } from 'vitest'

import { xmlNamespaceUri } from '../xmlNamespaceUri'
import { baseNamespaceScope } from './baseNamespaceScope'

describe('baseNamespaceScope', () => {
  it('binds only the xml prefix', () => {
    expect([...baseNamespaceScope()]).toEqual([['xml', xmlNamespaceUri]])
  })
})
