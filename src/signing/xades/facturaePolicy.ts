import type { SignaturePolicy } from './types/SignaturePolicy'
import { xadesUris } from './xadesUris'

/** The Facturae 3.1 signature policy FACe and the AEAT expect (XAdES-EPES). */
export const facturaePolicy: SignaturePolicy = {
  identifier:
    'http://www.facturae.es/politica_de_firma_formato_facturae/politica_de_firma_formato_facturae_v3_1.pdf',
  description: 'Política de Firma FacturaE v3.1',
  digestAlgorithm: xadesUris.sha1,
  digestValue: 'Ohixl6upD6av8N7pEvDABhEL6hM=',
}
