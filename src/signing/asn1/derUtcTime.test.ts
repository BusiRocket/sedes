import { describe, expect, it } from 'vitest'

import { derUtcTime } from './derUtcTime'

describe('derUtcTime', () => {
  it('writes YYMMDDHHMMSSZ', () => {
    const der = derUtcTime(new Date('2026-09-26T08:07:06Z'))
    expect(der[0]).toBe(0x17)
    expect(der.subarray(2).toString('latin1')).toBe('260926080706Z')
  })
})
