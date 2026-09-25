import { unescapeZkDesktopId } from '../mappers/unescapeZkDesktopId'
import type { ZkDesktop } from '../types/ZkDesktop'
import { parseComboWidgets } from './parseComboWidgets'

/**
 * Read the desktop id and the search widgets out of a fresh `index.zul`.
 * Every combo is looked up by its ZK `id`; the Buscar button only carries
 * its label.
 */
export const parseZkDesktop = (html: string): ZkDesktop => {
  const rawDesktopId = /dt:'(z_[^']+)'/.exec(html)?.[1]
  if (!rawDesktopId) throw new Error('AEAT: no ZK desktop id in index.zul')
  const combos = parseComboWidgets(html)
  const combo = (id: string): string => {
    const uuid = combos.get(id)
    if (uuid === undefined)
      throw new Error(`AEAT: widget ${id} not found in index.zul`)
    return uuid
  }
  const buttonBuscar = /Button','(\w+)',\{[^}]*label:'Buscar'/.exec(html)?.[1]
  if (!buttonBuscar)
    throw new Error('AEAT: Buscar button not found in index.zul')
  return {
    desktopId: unescapeZkDesktopId(rawDesktopId),
    comboModelos: combo('cbModelos'),
    comboEjercicios: combo('cbEjercicios'),
    comboPeriodos: combo('cbPeriodos'),
    buttonBuscar,
  }
}
