import { describe, expect, it } from 'vitest'

import { resolveXadesIds } from './resolveXadesIds'

describe('resolveXadesIds', () => {
  it('derives every id from one random signature id', () => {
    const ids = resolveXadesIds()
    expect(ids.signature).toMatch(/^Signature-[\da-f-]{36}$/)
    expect(ids.signedProperties).toBe(`${ids.signature}-SignedProperties`)
    expect(ids.reference).toMatch(/^Reference-[\da-f-]{36}$/)
  })
  it('derives from an overridden signature id and keeps other overrides', () => {
    const ids = resolveXadesIds({ signature: 'Sig', keyInfo: 'KI' })
    expect(ids.signedInfo).toBe('Sig-SignedInfo')
    expect(ids.keyInfo).toBe('KI')
  })
})
