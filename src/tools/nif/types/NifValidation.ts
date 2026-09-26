import type { NifKind } from './NifKind'

/** The answer of `ventanilla-unica validar nif`. */
export type NifValidation = {
  /** What was typed. */
  readonly valor: string
  /** Upper case, without spaces, dots, hyphens or an `ES` VAT prefix; DNI numbers padded to 8 digits. */
  readonly normalizado: string
  readonly tipo: NifKind
  readonly valido: boolean
  /** Why it is invalid; absent when valid. */
  readonly motivo?: string | undefined
}
