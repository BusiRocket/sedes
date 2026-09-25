import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeVidaLaboralPdf } from './writeVidaLaboralPdf'

describe('writeVidaLaboralPdf', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('writes the PDF named after the label, with unsafe characters replaced', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-vl-'))
    const pdf = Buffer.from('%PDF-1.4 informe')

    const path = await writeVidaLaboralPdf(dir, 'NOMBRE APELLIDO/2', pdf)

    expect(path).toBe(join(dir, 'tgss-vida-laboral-NOMBRE_APELLIDO_2.pdf'))
    // the path is the temp file this test just wrote
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(await readFile(path)).toEqual(pdf)
  })
})
