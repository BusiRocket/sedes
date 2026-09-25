/** A NIF of a legal entity (letter, seven digits, control), the only 036 layout captured. */
export const isLegalEntityNif = (nif: string): boolean =>
  /^[A-HJNP-SUVW]\d{7}[0-9A-J]$/.test(nif.toUpperCase())
