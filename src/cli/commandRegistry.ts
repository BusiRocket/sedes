import { aeatCertificadoCensal } from './commands/aeatCertificadoCensal'
import { aeatDeclaraciones } from './commands/aeatDeclaraciones'
import { aeatDeudas } from './commands/aeatDeudas'
import { aeatInformativas } from './commands/aeatInformativas'
import { aeatPagos } from './commands/aeatPagos'
import { dehuDocumentos } from './commands/dehuDocumentos'
import { dehuList } from './commands/dehuList'
import { oargtRecibos } from './commands/oargtRecibos'
import { sepeCertificado } from './commands/sepeCertificado'
import { sepePrestacion } from './commands/sepePrestacion'
import { tgssAlta } from './commands/tgssAlta'
import { tgssBases } from './commands/tgssBases'
import { tgssCorriente } from './commands/tgssCorriente'
import { tgssDatos } from './commands/tgssDatos'
import { tgssDeuda } from './commands/tgssDeuda'
import { tgssEmpresario } from './commands/tgssEmpresario'
import { tgssNss } from './commands/tgssNss'
import { tgssSituacion } from './commands/tgssSituacion'
import { tgssVidaLaboral } from './commands/tgssVidaLaboral'
import type { Command } from './types/Command'

export const commandRegistry: readonly Command[] = [
  aeatDeudas,
  aeatPagos,
  aeatDeclaraciones,
  aeatInformativas,
  aeatCertificadoCensal,
  tgssDeuda,
  tgssCorriente,
  tgssVidaLaboral,
  tgssSituacion,
  tgssNss,
  tgssDatos,
  tgssAlta,
  tgssEmpresario,
  tgssBases,
  dehuList,
  dehuDocumentos,
  oargtRecibos,
  sepePrestacion,
  sepeCertificado,
]
