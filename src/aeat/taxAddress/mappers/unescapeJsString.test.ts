import { describe, expect, it } from 'vitest'

import { unescapeJsString } from './unescapeJsString'

describe('unescapeJsString', () => {
  it('decodes hex, unicode and simple escapes', () => {
    expect(unescapeJsString("a\\xf3 \\u00e1 \\' \\\\")).toBe("aó á ' \\")
  })
})
