import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { planSignatureObjects } from './planSignatureObjects'

describe('planSignatureObjects', () => {
  const doc = readPdfDocument(buildClassicPdf())
  const request = { commonName: 'ANA', date: new Date(0), visible: false }

  it('writes signature, widget, AcroForm, catalog and page for an invisible signature', () => {
    const objects = planSignatureObjects(doc, request)
    expect(objects.map((object) => object.num)).toEqual([4, 5, 6, 1, 3])
    expect(objects[1]?.bytes.toString('latin1')).toContain('/T (Signature5)')
  })

  it('adds the font and appearance of a visible stamp', () => {
    const objects = planSignatureObjects(doc, { ...request, visible: true })
    expect(objects.map((object) => object.num)).toEqual([4, 5, 6, 7, 8, 1, 3])
  })

  it('does not rewrite catalog or page when AcroForm and Annots are indirect', () => {
    const indirect = readPdfDocument(
      buildClassicPdf([
        '<< /Type /Catalog /Pages 2 0 R /AcroForm 4 0 R >>',
        '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        '<< /Type /Page /Parent 2 0 R /Annots 5 0 R >>',
        '<< /Fields [] >>',
        '[]',
      ]),
    )
    expect(
      planSignatureObjects(indirect, request).map((object) => object.num),
    ).toEqual([6, 7, 4, 5])
  })
})
