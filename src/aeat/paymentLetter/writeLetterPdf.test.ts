import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { writeLetterPdf } from './writeLetterPdf'

describe('writeLetterPdf', () => {
  it('writes aeat-010-<justificante>.pdf', async () => {
    const outDir = join(await mkdtemp(join(tmpdir(), 'sedes-010-')), 'o')
    const path = await writeLetterPdf(
      outDir,
      '100000000000A',
      Buffer.from('%PDF'),
    )
    expect(path).toBe(join(outDir, 'aeat-010-100000000000A.pdf'))
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect((await readFile(path)).toString()).toBe('%PDF')
  })
})
