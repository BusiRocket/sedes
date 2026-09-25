import { describe, expect, it } from 'vitest'

import { derNull } from '../asn1/derNull'
import { cmsAttribute } from './cmsAttribute'

describe('cmsAttribute', () => {
  it('is SEQUENCE { oid, SET { values } }', () => {
    expect(cmsAttribute('1.2.3', [derNull()]).toString('hex')).toBe(
      '300806022a0331020500',
    )
  })
})
