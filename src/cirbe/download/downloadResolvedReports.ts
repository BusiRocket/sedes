import type { HttpClient } from '../../http/types/HttpClient'
import type { DownloadedReport } from '../types/DownloadedReport'
import { downloadRiskReport } from './downloadRiskReport'

/** Both files of the latest resolved request, one after the other (the flow is a single server-side conversation). */
export const downloadResolvedReports = async (
  client: HttpClient,
  outDir: string,
): Promise<DownloadedReport[]> => {
  const tipos = ['Informe Detallado', 'Informe Global']
  const downloaded: DownloadedReport[] = []
  for (const tipo of tipos) {
    // Sequential on purpose: each file walks the same WebFlow conversation.
    const report = await downloadRiskReport(client, tipo, outDir)
    if (report !== undefined) downloaded.push(report)
  }
  return downloaded
}
