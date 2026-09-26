import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { writeNotificationFile } from './writeNotificationFile'

describe('writeNotificationFile', () => {
  it('decodes the base64 and writes it under the given name', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'ventanilla-unica-dehu-'))
    const content = Buffer.from('%PDF-1.4 test').toString('base64')

    const written = await writeNotificationFile(dir, 'N1_voucher.pdf', content)

    expect(written).toEqual({ path: join(dir, 'N1_voucher.pdf'), bytes: 13 })
    // the path is the temp file this test just wrote
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect((await readFile(written.path)).toString()).toBe('%PDF-1.4 test')
  })
})
