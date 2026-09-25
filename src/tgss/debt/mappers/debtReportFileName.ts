import type { DebtReportKind } from '../types/DebtReportKind'

/** `tgss-deuda-<nif>.pdf` for the detailed report, `tgss-deuda-total-<nif>.pdf` for the total. */
export const debtReportFileName = (
  kind: DebtReportKind,
  nif: string,
): string =>
  kind === 'total' ? `tgss-deuda-total-${nif}.pdf` : `tgss-deuda-${nif}.pdf`
