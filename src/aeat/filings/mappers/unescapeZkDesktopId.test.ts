import { describe, expect, it } from 'vitest'

import { unescapeZkDesktopId } from './unescapeZkDesktopId'

describe('unescapeZkDesktopId', () => {
  it('decodes the JS hex escapes ZK writes into the page', () => {
    expect(unescapeZkDesktopId(String.raw`z_1hIcQx\x2DaFqdpE7q9bkQN4A`)).toBe(
      'z_1hIcQx-aFqdpE7q9bkQN4A',
    )
  })

  it('leaves a plain id untouched', () => {
    expect(unescapeZkDesktopId('z_plain')).toBe('z_plain')
  })
})
