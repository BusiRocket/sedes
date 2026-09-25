import { parseArgs } from 'node:util'

import { globalCliOptions } from './globalCliOptions'
import type { CliOptions } from './types/CliOptions'

/** Parse the `--name value` options of a command; unknown options are an error. */
export const parseCliOptions = (
  argv: readonly string[],
  commandOptions: readonly string[],
): CliOptions => {
  const names = [...globalCliOptions, ...commandOptions]
  const parsed = parseArgs({
    args: [...argv],
    allowPositionals: false,
    strict: true,
    options: Object.fromEntries(
      names.map((name) => [name, { type: 'string' as const }]),
    ),
  })
  const options: Record<string, string | undefined> = {}
  for (const name of names) {
    const value = parsed.values[name]
    options[name] = typeof value === 'string' ? value : undefined
  }
  return options
}
