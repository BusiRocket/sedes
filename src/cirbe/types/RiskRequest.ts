/** One report request as `ConsultaSolicitudesRiesgos` lists it. */
export type RiskRequest = {
  readonly fechaSolicitud: string
  readonly referencia: string
  readonly periodo: string
  /** `Registrada` (in process), `Resuelta` or `Descargada` (both downloadable for 20 days). */
  readonly estado: string
  readonly fechaObtencion: string
}
