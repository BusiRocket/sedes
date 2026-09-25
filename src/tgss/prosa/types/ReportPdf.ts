import type { ReportDocument } from './ReportDocument'

/** A downloaded report: where the session announced it and its PDF bytes. */
export type ReportPdf = {
  readonly document: ReportDocument
  readonly pdf: Buffer
}
