import { describe, expect, it } from 'vitest'

import { renderTestElement } from '../fixtures/renderTestElement'
import { buildTextElement } from './buildTextElement'

describe('buildTextElement', () => {
  it('wraps text in an element', () => {
    expect(renderTestElement(buildTextElement('a', 'x<y'))).toBe(
      '<a>x&lt;y</a>',
    )
  })
})
