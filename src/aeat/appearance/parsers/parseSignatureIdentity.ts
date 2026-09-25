import type { SignatureIdentity } from '../types/SignatureIdentity'

/** The `_fbNif` / `_fbNombre` values the signature screen's script pre-fills. */
export const parseSignatureIdentity = (html: string): SignatureIdentity => {
  const nif = /_fbNif\s*[=:]\s*["']([^"']*)["']/.exec(html)?.[1]
  const nombre = /_fbNombre\s*[=:]\s*["']([^"']*)["']/.exec(html)?.[1]
  if (!nif || !nombre)
    throw new Error(
      'AEAT: the notification page carries no _fbNif/_fbNombre (not a signature screen)',
    )
  return { nif, nombre }
}
