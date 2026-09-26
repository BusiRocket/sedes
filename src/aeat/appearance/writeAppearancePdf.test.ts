import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { writeAppearancePdf } from './writeAppearancePdf'

describe('writeAppearancePdf', () => {
  it('creates outDir and writes the named PDF', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ventanilla-unica-appearance-'))
    const outDir = join(root, 'nested')
    const path = await writeAppearancePdf(outDir, '1-acto', Buffer.from('%PDF'))
    expect(path).toBe(join(outDir, 'aeat-notificacion-1-acto.pdf'))
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect((await readFile(path)).toString()).toBe('%PDF')
  })
})
