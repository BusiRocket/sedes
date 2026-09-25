/** A modelo 036 change of fiscal address (casilla 122) for a legal entity. */
export type TaxAddressRequest = {
  readonly nif: string
  readonly codigoPostal: string
  /** Street name as the 036 street finder filters it; must match exactly one street. */
  readonly via: string
  /** The 036 number type, `NUMERO` unless the address uses a km or another type. */
  readonly tipoNumero: string
  readonly numero: string
  readonly complemento?: string | undefined
  /** The 20-character referencia catastral of the premises. */
  readonly referenciaCatastral: string
  /** Where the declaration is signed (lugar). */
  readonly lugar: string
  /** Who signs, as printed in the signature box. */
  readonly firmado: string
  /** In what capacity the signer acts, e.g. `Representante`. */
  readonly calidad: string
  readonly confirm: boolean
}
