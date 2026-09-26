import { describe, expect, it } from 'vitest'

import { formatSlashDate } from './formatSlashDate'

describe('formatSlashDate', () => {
  it('pads day and month', () => {
    expect(formatSlashDate(new Date(2026, 0, 5))).toBe('05/01/2026')
  })
})
