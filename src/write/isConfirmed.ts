import type { CliOptions } from '../cli/types/CliOptions'

/** True only when the holder typed `--confirmar si`; any other value, or none, keeps a write in plan mode. */
export const isConfirmed = (options: CliOptions): boolean =>
  options['confirmar'] === 'si'
