import type { DebtReportKind } from '../types/DebtReportKind'

/** The AECPSED1 `certificado` option each debt report kind posts. */
export const debtReportCertificado: Readonly<Record<DebtReportKind, string>> = {
  detallado: '7',
  total: '6',
}
