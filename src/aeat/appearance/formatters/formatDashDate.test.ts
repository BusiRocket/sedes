import { describe, expect, it } from 'vitest'

import { formatDashDate } from './formatDashDate'

describe('formatDashDate', () => {
  it('pads day and month', () => {
    expect(formatDashDate(new Date(2026, 0, 5))).toBe('05-01-2026')
  })
})
