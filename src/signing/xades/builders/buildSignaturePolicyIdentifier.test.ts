import { describe, expect, it } from 'vitest'

import { facturaePolicy } from '../facturaePolicy'
import { renderTestElement } from '../fixtures/renderTestElement'
import { buildSignaturePolicyIdentifier } from './buildSignaturePolicyIdentifier'

const prefixes = { ds: 'ds', xades: 'xa' }

describe('buildSignaturePolicyIdentifier', () => {
  it('names the policy, its description and its hash', () => {
    expect(
      renderTestElement(
        buildSignaturePolicyIdentifier(prefixes, facturaePolicy),
      ),
    ).toBe(
      `<xa:SignaturePolicyIdentifier><xa:SignaturePolicyId><xa:SigPolicyId><xa:Identifier>${facturaePolicy.identifier}</xa:Identifier><xa:Description>Política de Firma FacturaE v3.1</xa:Description></xa:SigPolicyId><xa:SigPolicyHash><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></ds:DigestMethod><ds:DigestValue>Ohixl6upD6av8N7pEvDABhEL6hM=</ds:DigestValue></xa:SigPolicyHash></xa:SignaturePolicyId></xa:SignaturePolicyIdentifier>`,
    )
  })
  it('omits an absent description', () => {
    expect(
      renderTestElement(
        buildSignaturePolicyIdentifier(prefixes, {
          identifier: 'urn:p',
          digestAlgorithm: 'a',
          digestValue: 'v',
        }),
      ),
    ).not.toContain('Description')
  })
})
