import { describe, expect, it } from 'vitest'

import { facturaePolicy } from './facturaePolicy'
import { xadesUris } from './xadesUris'

describe('facturaePolicy', () => {
  it('is the Facturae 3.1 policy with its published SHA-1', () => {
    expect(facturaePolicy.identifier).toMatch(
      /politica_de_firma_formato_facturae_v3_1\.pdf$/,
    )
    expect(facturaePolicy.digestAlgorithm).toBe(xadesUris.sha1)
    expect(facturaePolicy.digestValue).toBe('Ohixl6upD6av8N7pEvDABhEL6hM=')
  })
})
