import type { HttpClient } from '../../http/types/HttpClient'
import { fetchRequestsList } from '../fetchers/fetchRequestsList'
import { reportFileName } from '../mappers/reportFileName'
import { readDatoRecords } from '../parsers/readDatoRecords'
import { readDatoValues } from '../parsers/readDatoValues'
import type { DownloadedReport } from '../types/DownloadedReport'
import { fetchReportFile } from './fetchers/fetchReportFile'
import { openDownloadFlow } from './fetchers/openDownloadFlow'
import { postReportFileChoice } from './fetchers/postReportFileChoice'
import { releaseReportFile } from './fetchers/releaseReportFile'
import { selectResolvedRecord } from './selectors/selectResolvedRecord'
import { writeRiskReportPdf } from './writeRiskReportPdf'

/**
 * Download one report file (`tipo`) of the latest resolved request into
 * `outDir`. Each file restarts from the request list, as the portal's own
 * flow does. Undefined when no request is resolved or it lacks that file.
 */
export const downloadRiskReport = async (
  client: HttpClient,
  tipo: string,
  outDir: string,
): Promise<DownloadedReport | undefined> => {
  const list = await fetchRequestsList(client)
  const request = selectResolvedRecord(
    readDatoRecords(list.xml, 'RegistrosSolicitudesRiesgos'),
  )
  if (request === undefined) return undefined
  const files = await openDownloadFlow(client, list, request)
  const response = readDatoRecords(files.xml, 'RelacionesRespuestas').find(
    (row) => row['TipoRespuesta'] === tipo,
  )
  if (response === undefined) return undefined
  const selected = await postReportFileChoice(client, files, response)
  const fichero = readDatoValues(selected.xml, 'Fichero').find((v) => v)
  if (fichero === undefined)
    throw new Error(`CIRBE: ${tipo} answered no file name`)
  await releaseReportFile(client, selected.state)
  const pdf = await fetchReportFile(client, fichero)
  const name = reportFileName(tipo, request['REFERENCIA'] ?? '')
  const path = await writeRiskReportPdf(outDir, name, pdf)
  return { tipo, fichero, path, bytes: pdf.length }
}
