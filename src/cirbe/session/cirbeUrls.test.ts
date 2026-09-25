import { describe, expect, it } from 'vitest'

import { cirbeUrls } from './cirbeUrls'

describe('cirbeUrls', () => {
  it('encodes the file name into the file URL', () => {
    expect(cirbeUrls.file('a b/c.pdf')).toBe(
      'https://aps.bde.es/cir_www/gestiondeficheros/a%20b%2Fc.pdf',
    )
  })
})
