import { readFile } from 'node:fs/promises'

/** Read the holder's `--in` file. */
export const readContentFile = async (path: string): Promise<Buffer> =>
  // path is the holder's own --in choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  readFile(path)
