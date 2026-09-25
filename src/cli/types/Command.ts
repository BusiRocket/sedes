import type { HttpClient } from '../../http/types/HttpClient'
import type { CliOptions } from './CliOptions'

/** One read-only CLI command: `sedes <portal> <action> [options]`. */
export type Command = {
  readonly portal: string
  readonly action: string
  readonly description: string
  /** Option names the command accepts beyond the global ones (`--cert`, `--key`, `--out`). */
  readonly options: readonly string[]
  run(client: HttpClient, options: CliOptions): Promise<unknown>
}
