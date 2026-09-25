import { describe, expect, it } from 'vitest'

import { splitQualifiedName } from './splitQualifiedName'

describe('splitQualifiedName', () => {
  it('splits prefixed and unprefixed names', () => {
    expect(splitQualifiedName('ds:Signature')).toEqual({
      prefix: 'ds',
      local: 'Signature',
    })
    expect(splitQualifiedName('Id')).toEqual({ prefix: '', local: 'Id' })
  })
})
