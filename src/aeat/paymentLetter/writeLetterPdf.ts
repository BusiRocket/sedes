import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Write the carta de pago as `aeat-010-<justificante>.pdf` under outDir. */
export const writeLetterPdf = async (
  outDir: string,
  justificante: string,
  pdf: Buffer,
): Promise<string> => {
  const filePath = join(outDir, `aeat-010-${justificante}.pdf`)
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await mkdir(outDir, { recursive: true })
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(filePath, pdf)
  return filePath
}
