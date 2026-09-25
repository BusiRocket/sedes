import type { NifKind } from '../types/NifKind'

/** The family a normalized identifier belongs to, by its shape alone. */
export const nifKindOf = (nif: string): NifKind => {
  if (/^\d{8}[A-Z]$/.test(nif)) return 'dni'
  if (/^[XYZ]\d{7}[A-Z]$/.test(nif)) return 'nie'
  if (/^[KLM]\d{7}[A-Z]$/.test(nif)) return 'nif-especial'
  if (/^[A-HJNP-SUVW]\d{7}[\dA-J]$/.test(nif)) return 'persona-juridica'
  return 'desconocido'
}
