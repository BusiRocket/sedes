import type { Command } from './Command'
import { aeatDeudas } from './commands/aeatDeudas'
import { dehuList } from './commands/dehuList'
import { oargtRecibos } from './commands/oargtRecibos'
import { tgssDeuda } from './commands/tgssDeuda'

/** Every command the binary offers, in the order the help lists them. */
export const commandRegistry: readonly Command[] = [
  aeatDeudas,
  tgssDeuda,
  dehuList,
  oargtRecibos,
]
