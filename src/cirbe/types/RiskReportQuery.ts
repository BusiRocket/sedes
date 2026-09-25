/** What the "Petición de informe" form requires besides the certificate. */
export type RiskReportQuery = {
  /** Date of birth, exactly `dd-mm-aaaa`. */
  readonly birthDate: string
  /** Where the Banco de España announces that the report is ready. */
  readonly email: string
}
