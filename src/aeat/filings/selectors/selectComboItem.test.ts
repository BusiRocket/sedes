import { describe, expect, it } from 'vitest'

import { selectComboItem } from './selectComboItem'

const items = [
  { uuid: 'iM100', label: '100 - Renta' },
  { uuid: 'iM303', label: String.raw`303 \x2D IVA` },
  { uuid: 'iE2025', label: '2025' },
  { uuid: 'iP1T', label: '1T Primer trimestre' },
]

describe('selectComboItem', () => {
  it('matches an exact label, a label followed by a space and a dashed label', () => {
    expect(selectComboItem(items, '2025')).toBe('iE2025')
    expect(selectComboItem(items, '1T')).toBe('iP1T')
    expect(selectComboItem(items, '303')).toBe('iM303')
    expect(selectComboItem(items, ' 100 ')).toBe('iM100')
  })

  it('does not match a prefix without a separator and names the candidates', () => {
    expect(() => selectComboItem(items, '30')).toThrow(
      /combo item '30' not found among \["100 - Renta","303 - IVA"/,
    )
  })
})
