import type { HttpClient } from '../../http/types/HttpClient'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { sepeUrls } from '../session/sepeUrls'
import { postLatin1Form } from './fetchers/postLatin1Form'
import { requireFormByName } from './requireFormByName'
import type { SituationCertificateResult } from './types/SituationCertificateResult'
import { writeSituationCertificatePdf } from './writeSituationCertificatePdf'

/**
 * Emit the "certificado de situación" as a PDF: three POSTs after the login,
 * each a form the previous page carries. The kind is chosen with `tipo` (the
 * `ó` must travel as Latin-1), the request is confirmed with `opcion`, and
 * the download form's `xml` field is the certificate itself, which
 * `parseForms` has unescaped: posted still escaped, the WAF refuses it with
 * "Se le ha denegado el acceso a la URL".
 */
export const emitSituationCertificate = async (
  client: HttpClient,
  outDir: string | undefined,
): Promise<SituationCertificateResult> => {
  if (!outDir) throw new Error('SEPE: --out is required to save the PDF')
  const timeoutMs = 120_000
  const landed = await loginWithCertificate(client, sepeUrls.certificates)
  const chooser = requireFormByName(landed, 'tipoCertFormBean')
  const kindFields = Object.fromEntries(
    Object.entries(chooser.fields).filter(([name]) => name !== 'textoIRPFMult'),
  )
  const requested = await postLatin1Form(
    client,
    { action: chooser.action, fields: kindFields },
    { tipo: 'De situación' },
    { referer: landed.url, timeoutMs },
  )
  const confirmed = await postLatin1Form(
    client,
    requireFormByName(requested, 'DSolicitudForm'),
    { opcion: 'Aceptar' },
    { referer: requested.url, timeoutMs },
  )
  const download = await postLatin1Form(
    client,
    requireFormByName(confirmed, 'DescargaCertificadoForm'),
    {},
    {
      referer: confirmed.url,
      headers: { Origin: sepeUrls.sedeOrigin },
      timeoutMs,
    },
  )
  if (!download.body.subarray(0, 4).equals(Buffer.from('%PDF')))
    throw new Error(
      `SEPE: no PDF in the download (${String(download.status)}, ${String(download.body.length)} bytes)`,
    )
  const pdfPath = await writeSituationCertificatePdf(outDir, download.body)
  return {
    pdfPath,
    bytes: download.body.length,
    notes: [
      'the certificate is emitted on request; it changes nothing about the holder',
    ],
  }
}
