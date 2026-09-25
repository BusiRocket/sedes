import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Decode one base64 document and write it as `fileName` under `outDir`. */
export const writeNotificationFile = async (
  outDir: string,
  fileName: string,
  content: string,
): Promise<{ readonly path: string; readonly bytes: number }> => {
  const bytes = Buffer.from(content, 'base64')
  const path = join(outDir, fileName)
  // outDir is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path, bytes)
  return { path, bytes: bytes.length }
}
