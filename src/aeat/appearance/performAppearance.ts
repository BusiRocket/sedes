import type { HttpClient } from '../../http/types/HttpClient'
import { fetchFilingPdf } from '../filings/fetchers/fetchFilingPdf'
import { fetchNotifiedDocument } from './fetchers/fetchNotifiedDocument'
import { fetchSignatureScreen } from './fetchers/fetchSignatureScreen'
import { postAppearance } from './fetchers/postAppearance'
import { parseAppearanceConfirmation } from './parsers/parseAppearanceConfirmation'
import { parseSignatureIdentity } from './parsers/parseSignatureIdentity'
import type { AppearanceReceipt } from './types/AppearanceReceipt'
import { writeAppearancePdf } from './writeAppearancePdf'

/**
 * Appear (comparecer) at one notification, then save the act and the acuse.
 * Refuses before the act when the screen is pre-filled for another NIF.
 */
export const performAppearance = async (
  client: HttpClient,
  nif: string,
  ncc: string,
  outDir?: string,
): Promise<AppearanceReceipt> => {
  const identity = parseSignatureIdentity(
    await fetchSignatureScreen(client, ncc),
  )
  if (identity.nif.toUpperCase() !== nif.toUpperCase())
    throw new Error(
      `AEAT: notification ${ncc} would be signed as ${identity.nif}, not --nif ${nif}; nothing was done`,
    )
  const confirmation = parseAppearanceConfirmation(
    await postAppearance(client, ncc, identity),
  )
  if (!outDir) return { ncc, ...confirmation }
  const acto = await fetchNotifiedDocument(client, ncc)
  const actoPath = await writeAppearancePdf(outDir, `${ncc}-acto`, acto)
  const acusePath = confirmation.csv
    ? await writeAppearancePdf(
        outDir,
        `${ncc}-acuse`,
        await fetchFilingPdf(client, confirmation.csv),
      )
    : undefined
  return { ncc, ...confirmation, actoPath, acusePath }
}
