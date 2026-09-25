/* eslint-disable security/detect-non-literal-fs-filename -- every path is a fixture or one this test built under its own temp dir */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { readContentFile } from './readContentFile'

describe('readContentFile', () => {
  it('reads the file bytes', async () => {
    const path = join(mkdtempSync(join(tmpdir(), 'sedes-read-')), 'a.xml')
    writeFileSync(path, '<a/>')
    await expect(readContentFile(path)).resolves.toEqual(Buffer.from('<a/>'))
  })
})
