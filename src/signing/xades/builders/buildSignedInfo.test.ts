import { describe, expect, it } from 'vitest'

import { buildTestSignatureContext } from '../fixtures/buildTestSignatureContext'
import { renderTestElement } from '../fixtures/renderTestElement'
import type { ReferenceSpec } from '../types/ReferenceSpec'
import { buildSignedInfo } from './buildSignedInfo'

const content: ReferenceSpec = {
  id: 'R',
  uri: '',
  transforms: [],
  target: { kind: 'enveloped' },
}

describe('buildSignedInfo', () => {
  it('references the content, the SignedProperties and the KeyInfo', () => {
    const built = buildSignedInfo(buildTestSignatureContext(), content)
    const rendered = renderTestElement(built.element)
    expect(rendered).toMatch(
      /^<ds:SignedInfo Id="S-SignedInfo"><ds:CanonicalizationMethod Algorithm="http:\/\/www\.w3\.org\/TR\/2001\/REC-xml-c14n-20010315"><\/ds:CanonicalizationMethod><ds:SignatureMethod Algorithm="http:\/\/www\.w3\.org\/2001\/04\/xmldsig-more#rsa-sha256">/,
    )
    expect(rendered).toContain(
      '<ds:Reference Type="http://uri.etsi.org/01903#SignedProperties" URI="#S-SignedProperties">',
    )
    expect(built.references.map((reference) => reference.target)).toEqual([
      { kind: 'enveloped' },
      { kind: 'id', id: 'S-SignedProperties' },
      { kind: 'id', id: 'S-KeyInfo' },
    ])
  })
  it('leaves the KeyInfo unreferenced on request', () => {
    const built = buildSignedInfo(
      buildTestSignatureContext({
        keyInfo: { chain: true, keyValue: false, reference: false },
      }),
      content,
    )
    expect(built.references).toHaveLength(2)
  })
})
