import { describe, expect, it } from 'vitest'

import { testPdfBodies } from './testPdfBodies'

describe('testPdfBodies', () => {
  it('starts with a catalog', () => {
    expect(testPdfBodies[0]).toContain('/Type /Catalog')
  })
})
