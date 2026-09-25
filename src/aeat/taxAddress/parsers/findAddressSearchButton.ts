/**
 * The "Buscar dirección" button of the fiscal-address block: the last one
 * declared in the 6000 characters before the PJ street-type widget.
 */
export const findAddressSearchButton = (html: string): string => {
  const window = 6000
  const anchor = html.indexOf("id:'IDEN_PJ_DOMI_FIS_TIPO_VIA_B11'")
  if (anchor < 0)
    throw new Error(
      'AEAT: the 036 form has no legal-entity fiscal address block',
    )
  const before = html.slice(Math.max(0, anchor - window), anchor)
  const buttons = [
    ...before.matchAll(/Button','(\w+)',\{[^}]*label:'Buscar direcci/g),
  ]
  const uuid = buttons.at(-1)?.[1]
  if (!uuid) throw new Error('AEAT: 036 "Buscar dirección" button not found')
  return uuid
}
