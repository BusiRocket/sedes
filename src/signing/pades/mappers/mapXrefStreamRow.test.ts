import { describe, expect, it } from 'vitest'

import { mapXrefStreamRow } from './mapXrefStreamRow'

describe('mapXrefStreamRow', () => {
  it('maps the three row types', () => {
    expect(mapXrefStreamRow(0, 0, 0)).toEqual({ type: 'free' })
    expect(mapXrefStreamRow(1, 17, 0)).toEqual({ type: 'offset', offset: 17 })
    expect(mapXrefStreamRow(2, 4, 1)).toEqual({
      type: 'compressed',
      stream: 4,
      index: 1,
    })
    expect(mapXrefStreamRow(undefined, undefined, undefined)).toEqual({
      type: 'offset',
      offset: 0,
    })
    expect(mapXrefStreamRow(2, undefined, undefined)).toEqual({
      type: 'compressed',
      stream: 0,
      index: 0,
    })
  })
})
