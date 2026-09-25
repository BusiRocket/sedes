import { describe, expect, it } from 'vitest'

import { derContext } from './derContext'

describe('derContext', () => {
  it('uses the constructed context tag 0xa0 + n', () => {
    expect(derContext(0, Buffer.from([5, 0]))).toEqual(
      Buffer.from([0xa0, 2, 5, 0]),
    )
    expect(derContext(3, Buffer.alloc(0))[0]).toBe(0xa3)
  })
})
