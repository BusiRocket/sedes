import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Write one report PDF as `fileName` under `outDir`, creating the directory. */
export const writeRiskReportPdf = async (
  outDir: string,
  fileName: string,
  pdf: Buffer,
): Promise<string> => {
  const path = join(outDir, fileName)
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await mkdir(outDir, { recursive: true })
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path, pdf)
  return path
}
