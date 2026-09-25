import { describe, expect, it } from 'vitest'

import { buildText } from './buildText'

describe('buildText', () => {
  it('builds a text node', () => {
    expect(buildText('v')).toEqual({ kind: 'text', value: 'v' })
  })
})
