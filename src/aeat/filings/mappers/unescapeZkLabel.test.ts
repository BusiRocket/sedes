import { describe, expect, it } from 'vitest'

import { unescapeZkLabel } from './unescapeZkLabel'

describe('unescapeZkLabel', () => {
  it('decodes unicode escapes', () => {
    expect(unescapeZkLabel('Autoliquidaci\\u00F3n ')).toBe('Autoliquidación')
  })

  it('decodes hex escapes', () => {
    expect(unescapeZkLabel('303 \\x2D IVA')).toBe('303 - IVA')
  })

  it('decodes escaped quotes and trims', () => {
    expect(unescapeZkLabel(" Rgimen d\\'estimaci ")).toBe("Rgimen d'estimaci")
  })
})
