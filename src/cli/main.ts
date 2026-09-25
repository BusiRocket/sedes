#!/usr/bin/env node
import { commandRegistry } from './commandRegistry'
import { runCli } from './runCli'

/** Binary entry point: run the CLI and translate its outcome into an exit code. */
export const main = async (): Promise<void> => {
  const exitFailure = 1
  try {
    process.exitCode = await runCli(
      process.argv.slice(2),
      commandRegistry,
      (text) => process.stdout.write(text),
    )
  } catch (error) {
    process.stderr.write(
      `sedes: ${error instanceof Error ? error.message : String(error)}\n`,
    )
    process.exitCode = exitFailure
  }
}

await main()
