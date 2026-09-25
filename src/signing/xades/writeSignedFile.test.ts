/* eslint-disable security/detect-non-literal-fs-filename -- every path is a fixture or one this test built under its own temp dir */
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { writeSignedFile } from './writeSignedFile'

describe('writeSignedFile', () => {
  it('writes a new file and never overwrites one', async () => {
    const path = join(mkdtempSync(join(tmpdir(), 'papeleo-write-')), 'a.xsig')
    await writeSignedFile(path, Buffer.from('one'))
    expect(readFileSync(path, 'utf8')).toBe('one')
    await expect(writeSignedFile(path, Buffer.from('two'))).rejects.toThrow(
      /EEXIST/,
    )
  })
})
