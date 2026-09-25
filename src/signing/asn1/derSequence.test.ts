import { describe, expect, it } from 'vitest'

import { derNull } from './derNull'
import { derSequence } from './derSequence'

describe('derSequence', () => {
  it('concatenates children under tag 0x30', () => {
    expect(derSequence([derNull(), derNull()])).toEqual(
      Buffer.from([0x30, 4, 5, 0, 5, 0]),
    )
  })
})
