import { loadCertificateIdentity } from '../certificate/loadCertificateIdentity'
import { createHttpClient } from '../http/createHttpClient'
import { parseCliOptions } from './parseCliOptions'
import type { Command } from './types/Command'
import { usageText } from './usageText'

/**
 * Resolve the command from the first two words, parse its options, build the
 * holder's client and print the command's result as JSON on stdout.
 */
export const runCli = async (
  argv: readonly string[],
  commands: readonly Command[],
  write: (text: string) => void,
): Promise<number> => {
  const exitUsage = 2
  const [portal, action] = argv
  const command = commands.find(
    (candidate) => candidate.portal === portal && candidate.action === action,
  )
  if (!command || argv.includes('--help')) {
    write(usageText(commands) + '\n')
    return command ? 0 : exitUsage
  }
  const options = parseCliOptions(argv.slice(2), command.options)
  const identity = await loadCertificateIdentity({
    cert: options['cert'],
    key: options['key'],
  })
  const result = await command.run(createHttpClient(identity), options)
  write(JSON.stringify(result, null, 2) + '\n')
  return 0
}
