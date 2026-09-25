import type { WriteResult } from '../../write/types/WriteResult'
import { readPdfDocument } from './fetchers/readPdfDocument'
import { mapAttachmentPlan } from './mappers/mapAttachmentPlan'
import type { AttachmentQuery } from './types/AttachmentQuery'
import type { AttachmentReceipt } from './types/AttachmentReceipt'
import { validateCeusFileName } from './validators/validateCeusFileName'

/**
 * Attach a PDF to a CEUS expediente. Without confirmation nothing is sent:
 * even opening the expediente is a WPS navigation whose side effects are not
 * captured, so the plan is built from the local checks alone. With
 * confirmation it refuses before the first request, because the upload and
 * the WPS signing exchange have no HTTP capture yet; a half-run would leave a
 * staged, unsigned document that the next run signs twice.
 */
export const attachToExpediente = async (
  query: AttachmentQuery,
  confirmed: boolean,
): Promise<WriteResult<AttachmentReceipt>> => {
  const document = await readPdfDocument(query.documento)
  validateCeusFileName(document.fileName)
  const plan = mapAttachmentPlan(query, document)
  if (confirmed)
    throw new Error(
      'tgss adjuntar cannot submit yet: the CEUS detalleTramite upload and the cargarAutoFirmaWPS signing exchange have not been captured at HTTP level. Nothing was sent.',
    )
  return {
    action: 'tgss adjuntar',
    executed: false,
    plan,
    notes: [
      'No request was made: opening the expediente is not proven side-effect free.',
      'Submitting is a legal act; it needs --confirmar si and a captured signing contract.',
    ],
  }
}
