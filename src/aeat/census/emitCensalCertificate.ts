import type { HttpClient } from '../../http/types/HttpClient'
import { fetchFilingPdf } from '../filings/fetchers/fetchFilingPdf'
import { parseCsvCode } from '../filings/parsers/parseCsvCode'
import { openAeatSession } from '../session/openAeatSession'
import { fetchCensalEntryPage } from './fetchers/fetchCensalEntryPage'
import { postCensalForm } from './fetchers/postCensalForm'
import { encodeLatin1Form } from './mappers/encodeLatin1Form'
import { validationFields } from './mappers/validationFields'
import { withSignatureFields } from './mappers/withSignatureFields'
import { parseConfirmationFormFields } from './parsers/parseConfirmationFormFields'
import { parseIslwToken } from './parsers/parseIslwToken'
import type { CensalCertificateRequest } from './types/CensalCertificateRequest'
import type { CensalCertificateResult } from './types/CensalCertificateResult'
import { writeCensalCertificatePdf } from './writeCensalCertificatePdf'

/**
 * Ask EMCE-JDIT for the holder's "certificado de situación censal": validate
 * the request (fAccion=2), confirm it with the firma básica fields, exchange
 * the CSV of the receipt for the PDF. Asked twice the same day, AEAT answers
 * the cached CSV, so a censal change filed today shows up tomorrow.
 */
export const emitCensalCertificate = async (
  client: HttpClient,
  request: CensalCertificateRequest,
  outDir: string | undefined,
): Promise<CensalCertificateResult> => {
  const notes = [
    'FIR=FirmaBasica is a form value the portal names "firma basica": certificate authentication, not a cryptographic signature',
    'asked twice on the same day, AEAT answers the cached CSV of the first certificate',
  ]
  await openAeatSession(client)
  const islw = parseIslwToken(await fetchCensalEntryPage(client))
  if (islw === undefined)
    throw new Error(
      'AEAT: no fIslw token, the certificate did not authenticate',
    )
  const confirmation = await postCensalForm(
    client,
    encodeLatin1Form(validationFields(islw)),
  )
  const signed = withSignatureFields(
    parseConfirmationFormFields(confirmation),
    request,
  )
  const receipt = await postCensalForm(client, encodeLatin1Form(signed))
  const csv = parseCsvCode(receipt)
  if (csv === undefined)
    throw new Error('AEAT: the signed request came back without a CSV')
  const pdf = await fetchFilingPdf(client, csv)
  const pdfPath =
    outDir === undefined
      ? undefined
      : await writeCensalCertificatePdf(outDir, `${request.nif}-${csv}`, pdf)
  return { ...request, csv, pdfPath, bytes: pdf.length, notes }
}
