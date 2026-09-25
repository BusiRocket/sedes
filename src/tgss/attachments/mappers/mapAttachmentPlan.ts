import type { AttachmentQuery } from '../types/AttachmentQuery'
import type { SubmittedDocument } from '../types/SubmittedDocument'
import { mapCeusDocumentType } from './mapCeusDocumentType'

/** Every step `sedes tgss adjuntar` would take, with the values it would send. */
export const mapAttachmentPlan = (
  query: AttachmentQuery,
  document: SubmittedDocument,
): readonly string[] => [
  'Log in with the certificate through the WPS redirector (PortalRedirectorN1P, idApp=2806) and open the Importass home (/wps/myportal/importass/importass/inicio).',
  `Open "Expedientes y solicitudes" > "Acceder a tus expedientes" > the row of expediente ${query.expediente}.`,
  'Refuse to continue if the "Borrar" list already holds a document staged by an earlier unsigned run: it would be signed a second time.',
  `Select #tipoDocumentoOpcional=${query.tipo} (${mapCeusDocumentType(query.tipo)}).`,
  `Choose #documentoOpcional=${document.fileName} (${String(document.bytes)} bytes); its change handler uploads it at once with a POST to the detalleTramite URL.`,
  'Press #FIRMAR: ProsaAutoscript.cargarAutoFirmaWPS asks for the certificate (base64 DER) and a SHA256withRSA PKCS#1 signature over the data the portal prepared.',
  'Read "Tu documentación ha sido adjuntada correctamente" and the justificante number.',
]
