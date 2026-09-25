import { describe, expect, it } from 'vitest'

import { buildTestSignatureContext } from '../fixtures/buildTestSignatureContext'
import { renderTestElement } from '../fixtures/renderTestElement'
import { buildQualifyingObject } from './buildQualifyingObject'

describe('buildQualifyingObject', () => {
  it('targets the signature from a ds:Object', () => {
    expect(
      renderTestElement(buildQualifyingObject(buildTestSignatureContext())),
    ).toMatch(
      /^<ds:Object><xades:QualifyingProperties Id="S-QualifyingProperties" Target="#S"><xades:SignedProperties /,
    )
  })
})
