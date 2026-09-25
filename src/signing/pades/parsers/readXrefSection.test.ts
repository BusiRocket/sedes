import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { buildObjectStreamPdf } from '../fixtures/buildObjectStreamPdf'
import { findStartXref } from './findStartXref'
import { readXrefSection } from './readXrefSection'

describe('readXrefSection', () => {
  it('reads a classic table', () => {
    const pdf = buildClassicPdf()
    const text = pdf.toString('latin1')
    expect(readXrefSection(pdf, text, findStartXref(text)).isStream).toBe(false)
  })

  it('reads a predicted, compressed xref stream', () => {
    const pdf = buildObjectStreamPdf()
    const text = pdf.toString('latin1')
    const section = readXrefSection(pdf, text, findStartXref(text))
    expect(section.isStream).toBe(true)
    expect(section.entries.get(3)).toEqual({
      type: 'compressed',
      stream: 4,
      index: 2,
    })
  })

  it('refuses an offset holding neither', () => {
    const pdf = Buffer.from('1 0 obj\n<< >>\nendobj\n')
    expect(() => readXrefSection(pdf, pdf.toString('latin1'), 0)).toThrow(
      /no xref table/,
    )
  })
})
