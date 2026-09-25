import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Write the informe as `tgss-vida-laboral-<label>.pdf` under `outDir`. */
export const writeVidaLaboralPdf = async (
  outDir: string,
  label: string,
  pdf: Buffer,
): Promise<string> => {
  const safeLabel = label.replaceAll(/[^\w-]+/g, '_')
  const filePath = join(outDir, `tgss-vida-laboral-${safeLabel}.pdf`)
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(filePath, pdf)
  return filePath
}
