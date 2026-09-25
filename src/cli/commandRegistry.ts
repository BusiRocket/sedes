import { aeatDeclaraciones } from './commands/aeatDeclaraciones'
import { aeatDeudas } from './commands/aeatDeudas'
import { aeatPagos } from './commands/aeatPagos'
import { dehuDocumentos } from './commands/dehuDocumentos'
import { dehuList } from './commands/dehuList'
import { oargtRecibos } from './commands/oargtRecibos'
import { tgssDeuda } from './commands/tgssDeuda'
import { tgssVidaLaboral } from './commands/tgssVidaLaboral'
import type { Command } from './types/Command'

export const commandRegistry: readonly Command[] = [
  aeatDeudas,
  aeatPagos,
  aeatDeclaraciones,
  tgssDeuda,
  tgssVidaLaboral,
  dehuList,
  dehuDocumentos,
  oargtRecibos,
]
