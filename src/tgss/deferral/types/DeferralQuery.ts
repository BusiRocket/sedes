/** What `sedes tgss aplazamiento` asks for (XV207A01). */
export type DeferralQuery = {
  readonly nif: string
  readonly plazos: number
  readonly garantia: 'exenta'
  readonly documento: string
}
