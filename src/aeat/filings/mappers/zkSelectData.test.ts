import { describe, expect, it } from 'vitest'

import { zkClickData } from './zkClickData'
import { zkSelectData } from './zkSelectData'

describe('zk event payloads', () => {
  it('selects one item by uuid', () => {
    expect(zkSelectData('iM303')).toEqual({
      items: ['iM303'],
      reference: 'iM303',
    })
  })

  it('clicks with the coordinates the browser sends', () => {
    expect(zkClickData).toEqual({ pageX: 1, pageY: 1, which: 1, x: 1, y: 1 })
  })
})
