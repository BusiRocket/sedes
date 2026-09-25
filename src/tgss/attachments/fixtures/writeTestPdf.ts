import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/** Write a synthetic PDF under a fresh temporary directory and return its path. */
export const writeTestPdf = async (
  fileName = 'document.pdf',
  content = '%PDF-1.4\nsynthetic',
): Promise<string> => {
  const dir = await mkdtemp(join(tmpdir(), 'sedes-pdf-'))
  const path = join(dir, fileName)
  // The path is a fresh temporary directory created just above.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path, content)
  return path
}
