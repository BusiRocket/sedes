import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeFilingPdf } from './writeFilingPdf'

describe('writeFilingPdf', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('names the file after the modelo, ejercicio, periodo and expediente', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-aeat-'))
    const pdf = Buffer.from('%PDF-1.4 fixture')

    const filePath = await writeFilingPdf(
      dir,
      { modelo: '303', ejercicio: '2025', periodo: '1T' },
      '2025303A12345678',
      pdf,
    )

    expect(filePath).toBe(join(dir, 'aeat-303-20251T-2025303A12345678.pdf'))
    // filePath is the path this same test just built under its own temp dir.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await expect(readFile(filePath)).resolves.toEqual(pdf)
  })

  it('leaves the periodo out of the name when the search had none', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-aeat-'))

    const filePath = await writeFilingPdf(
      dir,
      { modelo: '303', ejercicio: '2025' },
      '2025303A1',
      Buffer.from('%PDF'),
    )

    expect(filePath).toBe(join(dir, 'aeat-303-2025-2025303A1.pdf'))
  })
})
