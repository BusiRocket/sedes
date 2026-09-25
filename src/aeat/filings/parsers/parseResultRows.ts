import type { ResultRows } from '../types/ResultRows'

/**
 * The search result grid out of the Buscar `zkau` response. The response
 * echoes the grid twice, so the text is cut at the `itemsInvalid_` marker and
 * the expedientes are deduplicated as well; each row carries two "Ver"
 * buttons and the first one is the declaration.
 */
export const parseResultRows = (text: string): ResultRows => {
  const buttonsPerRow = 2
  const marker = 'itemsInvalid_'
  const markerAt = text.indexOf(marker)
  const grid = markerAt >= 0 ? text.slice(0, markerAt) : text
  const expedientes = [
    ...new Set(
      [...grid.matchAll(/label:'(\d{13,18}\w?)\s*'/g)].map(
        ([, expediente = '']) => expediente,
      ),
    ),
  ]
  const verButtons = [
    ...grid.matchAll(
      /Button','(\w+)',\{\$onClick:true,(?:tabindex:0,)?prolog:' ',label:'Ver'/g,
    ),
  ]
    .map(([, uuid = '']) => uuid)
    .filter((_, index) => index % buttonsPerRow === 0)
    .slice(0, expedientes.length)
  return { expedientes, verButtons }
}
