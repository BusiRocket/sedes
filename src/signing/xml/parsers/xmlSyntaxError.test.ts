import { describe, expect, it } from 'vitest'

import { xmlSyntaxError } from './xmlSyntaxError'

describe('xmlSyntaxError', () => {
  it('names the problem and the offset', () => {
    expect(xmlSyntaxError({ text: 'abc', position: 2 }, 'bad').message).toBe(
      'xml: bad at offset 2',
    )
  })
})
