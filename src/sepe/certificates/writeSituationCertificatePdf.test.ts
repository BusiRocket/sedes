import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeSituationCertificatePdf } from './writeSituationCertificatePdf'

describe('writeSituationCertificatePdf', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('writes the PDF under outDir with a fixed name', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-sepe-'))
    const pdf = Buffer.from('%PDF-1.4 certificado')

    const path = await writeSituationCertificatePdf(dir, pdf)

    expect(path).toBe(join(dir, 'sepe-certificado-situacion.pdf'))
    // the path is the temp file this test just wrote
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(await readFile(path)).toEqual(pdf)
  })
})
