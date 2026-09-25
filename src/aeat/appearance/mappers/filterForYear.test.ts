import { describe, expect, it } from 'vitest'

import { filterForYear } from './filterForYear'

describe('filterForYear', () => {
  it('spans the twelve months before today', () => {
    const today = new Date(2026, 8, 26)
    const filter = filterForYear('unread', today)
    expect(filter.read).toBe('unread')
    expect(filter.to).toBe(today)
    expect(filter.from.getFullYear()).toBe(2025)
    expect(filter.from.getMonth()).toBe(8)
  })
})
