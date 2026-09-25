import type { SubmittedDocument } from '../../attachments/types/SubmittedDocument'
import type { DeferralQuery } from '../types/DeferralQuery'

/** Every XV207A01 step `sedes tgss aplazamiento` would take, with its values. */
export const mapDeferralPlan = (
  query: DeferralQuery,
  document: SubmittedDocument,
): readonly string[] => [
  'Log in with the certificate through the WPS redirector (PortalRedirectorN1P, idApp=2806) into XV207A01.',
  'If the portal shows "Solicitud incompleta", resume the server-side draft with SPM.ACC.CONTINUAR instead of starting a second one.',
  `SPM.ACC.DATOSTELEMATICOS: applicant data for NIF ${query.nif}.`,
  'SPM.ACC.SIGUIENTEPa1.',
  `SPM.ACC.IRAAMORT: amortisation in ${String(query.plazos)} instalments.`,
  'SPM.ACC.SIGUIENTEPa2.',
  'SPM.ACC.IRAEXENCIONES.',
  'SPM.ACC.IRAGARANTIAS: seleccionGarantiasTP=t (exención total), seleccionGarantias=t (debt under 150.000 EUR).',
  `SPM.ACC.ADJUNTAR: TIPODOCUMENTO=7 (mandato SEPA TC 1/15-3), DOCUMENTO0=${document.fileName} (${String(document.bytes)} bytes); skipped when SPM.ACC.ELIMINAR shows a document already attached.`,
  'SPM.ACC.ACEPTARDATOS: pre-registro (SPM.ACC.VERDATOS present).',
  'Firma optimizada: FIRMA_FILTROS_CERT_AUTOFIRMA, FIRMA_PREPARARXML_AUTOFIRMA with the certificate as base64 DER, a SHA256withRSA PKCS#1 signature over the prepared data, FIRMA_COMPONERXML_AUTOFIRMA.',
  'SPM.ACC.FIRMAR: read numRegistro and fechaRegistroCompleta from FrtgEnSolicitudDTO (estado "Presentada").',
]
