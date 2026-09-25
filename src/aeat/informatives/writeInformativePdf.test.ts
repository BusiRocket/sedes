import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeInformativePdf } from './writeInformativePdf'

describe('writeInformativePdf', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
  })

  it('names the file by modelo, ejercicio and expediente', async () => {
    dir = await mkdtemp(join(tmpdir(), 'informativas-'))
    const path = await writeInformativePdf(
      dir,
      { modelo: '190', ejercicio: '2025' },
      '2025190000001',
      Buffer.from('%PDF'),
    )
    expect(path).toBe(join(dir, 'aeat-190-2025-2025190000001.pdf'))
    // path is the file this same test just built under its own temp dir.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect((await readFile(path)).toString()).toBe('%PDF')
  })
})
