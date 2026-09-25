import type { TaxAddressRequest } from '../types/TaxAddressRequest'

/** A valid synthetic 036 request for a legal entity. */
export const taxAddressRequest: TaxAddressRequest = {
  nif: 'B00000000',
  codigoPostal: '10001',
  via: 'MAYOR',
  tipoNumero: 'NUMERO',
  numero: '3',
  complemento: 'LOCAL 1',
  referenciaCatastral: '0000000AA0000A0001AA',
  lugar: 'CACERES',
  firmado: 'ANA GARCIA LOPEZ',
  calidad: 'Representante',
  confirm: false,
}
