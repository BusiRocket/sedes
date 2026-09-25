import { describe, expect, it } from 'vitest'

import { buildTestSignatureContext } from '../fixtures/buildTestSignatureContext'
import { buildElement } from './buildElement'
import { buildSignature } from './buildSignature'

const content = {
  id: 'R',
  uri: '',
  transforms: [],
  target: { kind: 'enveloped' },
} as const

describe('buildSignature', () => {
  it('declares both prefixes and orders the children', () => {
    const skeleton = buildSignature(
      buildTestSignatureContext({ prefixes: { ds: 'dsig', xades: 'xa' } }),
      content,
    )
    expect(skeleton.signature.name).toBe('dsig:Signature')
    expect(skeleton.signature.attributes).toEqual([
      { name: 'xmlns:dsig', value: 'http://www.w3.org/2000/09/xmldsig#' },
      { name: 'xmlns:xa', value: 'http://uri.etsi.org/01903/v1.3.2#' },
      { name: 'Id', value: 'S' },
    ])
    expect(
      skeleton.signature.children.map((child) =>
        child.kind === 'element' ? child.name : child.kind,
      ),
    ).toEqual([
      'dsig:SignedInfo',
      'dsig:SignatureValue',
      'dsig:KeyInfo',
      'dsig:Object',
    ])
    expect(skeleton.references).toHaveLength(3)
    expect(skeleton.signedInfo).toBe(skeleton.signature.children[0])
  })
  it('puts the content object before the qualifying properties', () => {
    const object = buildElement('ds:Object', { Id: 'S-Object' })
    const skeleton = buildSignature(
      buildTestSignatureContext(),
      content,
      object,
    )
    expect(skeleton.signature.children[3]).toBe(object)
    expect(skeleton.signature.children).toHaveLength(5)
  })
})
