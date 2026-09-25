import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Save an emitted PDF as `fileName` under the holder's chosen `--out` directory. */
export const writeReportPdf = async (
  outDir: string,
  fileName: string,
  pdf: Buffer,
): Promise<string> => {
  const filePath = join(outDir, fileName)
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(filePath, pdf)
  return filePath
}
