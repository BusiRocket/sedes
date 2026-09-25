import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { writeRiskReportPdf } from './writeRiskReportPdf'

describe('writeRiskReportPdf', () => {
  it('creates the directory and writes the PDF', async () => {
    const dir = join(await mkdtemp(join(tmpdir(), 'papeleo-cirbe-')), 'out')

    const path = await writeRiskReportPdf(dir, 'r.pdf', Buffer.from('%PDF-1'))

    expect(path).toBe(join(dir, 'r.pdf'))
    // the path is the temp file this test just wrote
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect((await readFile(path)).toString()).toBe('%PDF-1')
  })
})
