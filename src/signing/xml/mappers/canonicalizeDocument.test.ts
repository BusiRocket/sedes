/* eslint-disable security/detect-non-literal-fs-filename -- every path is a fixture or one this test built under its own temp dir */
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { parseXmlDocument } from '../parsers/parseXmlDocument'
import { canonicalizeDocument } from './canonicalizeDocument'

const fixture = (name: string): Buffer =>
  readFileSync(new URL(`../fixtures/${name}`, import.meta.url))

// The W3C Canonical XML 1.0 examples of section 3. The DOCTYPEs are dropped
// (this parser refuses DTDs), so 3.3 and 3.4 lose only what their DTDs added:
// the defaulted attribute of e9 and the NMTOKENS/ID normalisation.
describe('canonicalizeDocument', () => {
  it.each([
    ['3-1', false],
    ['3-1', true],
    ['3-2', false],
    ['3-3', false],
    ['3-4', false],
    ['3-6', false],
  ] as const)('matches W3C C14N example %s (comments %s)', (name, comments) => {
    const document = parseXmlDocument(fixture(`c14n-${name}.input.xml`))
    const expected = fixture(
      `c14n-${name}${comments ? '.with-comments' : ''}.expected.xml`,
    ).toString('utf8')
    expect(
      canonicalizeDocument(document, {
        withComments: comments,
        exclusive: false,
      }),
    ).toBe(expected)
  })
})
