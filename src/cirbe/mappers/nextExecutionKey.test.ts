import { describe, expect, it } from 'vitest'

import { nextExecutionKey } from './nextExecutionKey'

describe('nextExecutionKey', () => {
  it('advances the snapshot number', () => {
    expect(nextExecutionKey('e1s1')).toBe('e1s2')
    expect(nextExecutionKey('e3s9')).toBe('e3s10')
  })
})
