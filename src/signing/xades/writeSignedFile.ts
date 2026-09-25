import { writeFile } from 'node:fs/promises'

/** Save the signed document at the holder's `--out` path, never over an existing file. */
export const writeSignedFile = async (
  path: string,
  content: Buffer,
): Promise<void> => {
  // path is the holder's own --out choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path, content, { flag: 'wx' })
}
