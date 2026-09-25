import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeReportPdf } from './writeReportPdf'

describe('writeReportPdf', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('writes the PDF under the given file name', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-tgss-'))
    const pdf = Buffer.from('%PDF-1.4 fixture')

    const filePath = await writeReportPdf(dir, 'tgss-deuda-12345678Z.pdf', pdf)

    expect(filePath).toBe(join(dir, 'tgss-deuda-12345678Z.pdf'))
    // filePath is the path this same test just built under its own temp dir.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await expect(readFile(filePath)).resolves.toEqual(pdf)
  })
})
