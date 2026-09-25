import type { HttpClient } from '../../http/types/HttpClient'
import { writeReportPdf } from '../debt/writeReportPdf'
import { driveProsaEmission } from '../prosa/fetchers/driveProsaEmission'
import { fetchProsaDocument } from '../prosa/fetchers/fetchProsaDocument'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { certificateKinds } from './certificateKinds'
import type { CertificateKind } from './types/CertificateKind'
import type { TgssCertificateResult } from './types/TgssCertificateResult'

/**
 * Emit one "certificado de estar al corriente" (AECPSED1) for the holder
 * and download its PDF. The portal declines with a message when the holder
 * is not up to date, has no CCC/NAF, or has reached the daily emission cap.
 * The kinds that certify an earlier date are listed but not sent: the
 * package has not captured the date field they need.
 */
export const emitUpToDateCertificate = async (
  client: HttpClient,
  nif: string,
  kind: CertificateKind,
  outDir?: string,
): Promise<TgssCertificateResult> => {
  const info = certificateKinds[kind]
  if (info.needsDate)
    throw new Error(
      `TGSS: certificate "${kind}" needs a reference date the package does not send yet`,
    )
  const notes = [
    'every emission counts against the portal daily cap per subject (about three)',
    'an issued certificate can be NEGATIVO (holder not up to date); the sign is only in the PDF text',
  ]
  const session = await loginWithCertificate(client, 'AECPSED1')
  const outcome = await driveProsaEmission(client, session, info.value)
  const base = { nif, kind, label: info.label, notes }
  if (!outcome.issued)
    return { ...base, issued: false, message: outcome.message }
  const pdf = await fetchProsaDocument(client, session.sessionId)
  const pdfPath = outDir
    ? await writeReportPdf(outDir, `tgss-corriente-${kind}-${nif}.pdf`, pdf)
    : undefined
  return { ...base, issued: true, pdfPath, bytes: pdf.length }
}
