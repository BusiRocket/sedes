import { describe, expect, it } from 'vitest'

import { slashDateWindows } from './slashDateWindows'

describe('slashDateWindows', () => {
  it('cuts a range into inclusive windows, the last one short', () => {
    expect(slashDateWindows('01/01/2026', '05/03/2026', 30)).toEqual([
      { desde: '01/01/2026', hasta: '30/01/2026' },
      { desde: '31/01/2026', hasta: '01/03/2026' },
      { desde: '02/03/2026', hasta: '05/03/2026' },
    ])
  })

  it('answers no window for an inverted range', () => {
    expect(slashDateWindows('02/01/2026', '01/01/2026', 30)).toEqual([])
  })
})
