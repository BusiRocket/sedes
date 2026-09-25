import type { AttachmentQuery } from '../types/AttachmentQuery'

/**
 * Check the options against what the CEUS form accepts, before any request:
 * `#tipoDocumentoOpcional` offers 1006, 1010 and 1008.
 */
export const validateAttachmentQuery = (
  options: Readonly<Record<string, string | undefined>>,
): AttachmentQuery => {
  const expediente = options['expediente']?.trim()
  const documento = options['documento']
  const tipo = options['tipo'] ?? ''
  if (!expediente) throw new Error('--expediente is required')
  if (!documento) throw new Error('--documento is required (a PDF)')
  if (!['1006', '1010', '1008'].includes(tipo))
    throw new Error(
      '--tipo must be 1006 (comunicación), 1010 (justificante) or 1008 (otros)',
    )
  return { expediente, documento, tipo }
}
