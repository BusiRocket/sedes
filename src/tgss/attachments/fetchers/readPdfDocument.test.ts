import { describe, expect, it } from 'vitest'

import { writeTestPdf } from '../fixtures/writeTestPdf'
import { readPdfDocument } from './readPdfDocument'

describe('readPdfDocument', () => {
  it('returns the file name and size of a PDF', async () => {
    const path = await writeTestPdf('mandato.pdf', '%PDF-1.7\nsynthetic')
    await expect(readPdfDocument(path)).resolves.toEqual({
      path,
      fileName: 'mandato.pdf',
      bytes: 18,
    })
  })

  it('refuses a file that is not a PDF', async () => {
    const path = await writeTestPdf('nota.txt', 'plain text')
    await expect(readPdfDocument(path)).rejects.toThrow(/not a PDF: nota.txt/)
  })
})
