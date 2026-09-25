import { describe, expect, it } from 'vitest'

import { isNamespaceDeclaration } from './isNamespaceDeclaration'

describe('isNamespaceDeclaration', () => {
  it('recognises xmlns and xmlns:prefix only', () => {
    expect(
      ['xmlns', 'xmlns:ds', 'xmlnsx', 'Id'].map(isNamespaceDeclaration),
    ).toEqual([true, true, false, false])
  })
})
